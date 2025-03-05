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
	const [countdown, setCountdown] = useState<number | null>(null);
	const countdownToastId = useRef<string | null>(null); // Store the toast ID

	// Auto-refocus input every second
	useEffect(() => {
		const interval = setInterval(() => {
			inputRef.current?.focus();
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	// Countdown logic (update existing toast)
	useEffect(() => {
		if (countdown !== null && countdown > 0) {
			const timer = setTimeout(() => {
				setCountdown(countdown - 1);

				// Update the existing toast message
				if (countdownToastId.current) {
					toast.dismiss(countdownToastId.current); // Remove old toast
					countdownToastId.current = toast.error(
						`You must wait ${
							countdown - 1
						} seconds before logging out.`,
						{ id: countdownToastId.current }
					);
				}
			}, 1000);
			return () => clearTimeout(timer);
		} else {
			// Clear toast when countdown finishes
			if (countdownToastId.current) {
				toast.dismiss(countdownToastId.current);
				countdownToastId.current = null;
			}
		}
	}, [countdown]);

	const createEmployeeLogMutation = useMutation({
		mutationFn: (values: { employeeNo: string }) =>
			createEmployeeLog(values),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employeeLogs"] });
		},
		onError: (error: any) => {
			if (error instanceof Error) {
				const match = error.message.match(/(\d+) seconds/);
				const remainingTime = match ? parseInt(match[1]) : 30;

				if (remainingTime > 0) {
					setCountdown(remainingTime);

					// Show toast only if not already showing
					if (!countdownToastId.current) {
						countdownToastId.current = toast.error(
							`You must wait ${remainingTime} seconds before logging out.`,
							{ id: "countdown-toast" }
						);
					}
				} else {
					toast.error(error.message);
				}
			} else {
				toast.error("An unexpected error occurred.");
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
										ref={(el) => {
											field.ref(el);
											inputRef.current = el;
										}}
										placeholder="(e.g FI0830)"
										autoComplete="off"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Scan</Button>
				</form>
			</Form>
		</>
	);
};

export default Scanner;
