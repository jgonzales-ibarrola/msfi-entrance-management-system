"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { scannerSchema, TScannerFormSchema } from "@/lib/types/forms/scanner";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployeeLog } from "@/app/services/employeeLogsService";
import toast, { Toaster } from "react-hot-toast";

const Scanner = () => {
	const queryClient = useQueryClient();
	const form = useForm<TScannerFormSchema>({
		resolver: zodResolver(scannerSchema),
		defaultValues: { employeeNo: "" },
	});

	const inputRef = useRef<HTMLInputElement>(null);
	const [countdowns, setCountdowns] = useState<Record<string, number>>({});
	const countdownIntervals = useRef<Record<string, NodeJS.Timeout>>({});

	// Auto-refocus input field
	useEffect(() => {
		const focusInput = () => inputRef.current?.focus();

		// Focus on mount and when clicking anywhere
		focusInput();
		document.addEventListener("click", focusInput);

		return () => document.removeEventListener("click", focusInput);
	}, []);

	// Countdown logic per employee
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCountdowns((prev) => {
				const updatedCountdowns = { ...prev };
				Object.keys(updatedCountdowns).forEach((employeeNo) => {
					if (updatedCountdowns[employeeNo] > 0) {
						updatedCountdowns[employeeNo] -= 1;
					} else {
						delete updatedCountdowns[employeeNo]; // Remove when countdown reaches 0
					}
				});
				return updatedCountdowns;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	// Handle mutation (log scanning)
	const createEmployeeLogMutation = useMutation({
		mutationFn: (values: { employeeNo: string }) =>
			createEmployeeLog(values),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employeeLogs"] });
			toast.success("Log recorded successfully!");
		},
		onError: (error: any, variables) => {
			const { employeeNo } = variables;

			if (error instanceof Error) {
				// Check if the error message contains a countdown time
				const match = error.message.match(/(\d+) seconds/);
				if (match) {
					const remainingTime = parseInt(match[1]);
					setCountdowns((prev) => ({
						...prev,
						[employeeNo]: remainingTime,
					}));
					toast.error(
						`Employee ${employeeNo} must wait ${remainingTime} seconds before logging out.`
					);
					return;
				}

				// Handle other known error messages
				if (error.message.includes("Employee ID not found")) {
					toast.error(
						"Employee ID does not exist. Please try again."
					);
					return;
				}

				if (error.message.includes("already log out")) {
					toast.error("You are already logged out.");
					return;
				}

				if (error.message.includes("already logged today")) {
					toast.error("Employee has already logged today.");
					return;
				}

				// Default fallback for unknown server errors
				toast.error(error.message || "An unexpected error occurred.");
			} else {
				// Handle errors that are not instances of Error
				toast.error("Something went wrong. Please try again later.");
			}
		},
	});

	const onSubmit = (values: TScannerFormSchema) => {
		form.reset();
		inputRef.current?.focus();
		createEmployeeLogMutation.mutate(values);
	};

	return (
		<>
			<Toaster />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 pb-4"
				>
					<FormField
						control={form.control}
						name="employeeNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Employee ID</FormLabel>
								<FormControl>
									<Input
										{...field}
										onChange={(e) => {
											const upperCaseValue =
												e.target.value.toUpperCase();
											field.onChange(upperCaseValue);
										}}
										ref={inputRef}
										placeholder="(e.g FI0830)"
										autoComplete="off"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						disabled={
							countdowns[form.getValues("employeeNo")] !==
								undefined &&
							countdowns[form.getValues("employeeNo")] > 0
						}
					>
						{countdowns[form.getValues("employeeNo")] !==
							undefined &&
						countdowns[form.getValues("employeeNo")] > 0
							? `Wait ${
									countdowns[form.getValues("employeeNo")]
							  }s`
							: "Scan"}
					</Button>
				</form>
			</Form>
		</>
	);
};

export default Scanner;
