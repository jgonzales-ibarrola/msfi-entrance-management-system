"use client";

import React, { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const Scanner = () => {
	const queryClient = useQueryClient();

	const form = useForm<TScannerFormSchema>({
		resolver: zodResolver(scannerSchema),
		defaultValues: {
			employeeNo: "",
		},
	});

	// Create a reference to the input field
	const inputRef = useRef<HTMLInputElement>(null);

	// Automatically refocus the input every 1 second
	useEffect(() => {
		const interval = setInterval(() => {
			inputRef.current?.focus();
		}, 1000);

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, []);

	// Mutations
	const createEmployeeLogMutation = useMutation({
		mutationFn: (values: { employeeNo: string }) =>
			createEmployeeLog(values),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["employeeLogs"] });
		},
	});

	const onSubmit = (values: TScannerFormSchema) => {
		console.log(values);
		form.reset(); // Reset input after scanning
		inputRef.current?.focus(); // Ensure it refocuses after submission
		createEmployeeLogMutation.mutate(values);
	};

	return (
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
									{...field} // Spread field props
									onChange={(e) => {
										const upperCaseValue =
											e.target.value.toUpperCase(); // Convert input to uppercase
										field.onChange(upperCaseValue); // Update form value
									}}
									ref={(el) => {
										field.ref(el); // Assign RHF ref
										inputRef.current = el; // Assign our ref
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
	);
};

export default Scanner;
