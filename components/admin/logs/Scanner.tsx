'use client';

import React from "react";

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

const Scanner = () => {
	const form = useForm<TScannerFormSchema>({
		resolver: zodResolver(scannerSchema),
		defaultValues: {
			id: "",
		},
	});

	function onSubmit(values: TScannerFormSchema) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-4">
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Employee ID</FormLabel>
							<FormControl>
								<Input placeholder="(e.g FI0830)" {...field} />
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
