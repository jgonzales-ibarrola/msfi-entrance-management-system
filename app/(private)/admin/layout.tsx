"use client";

import Sidenav from "@/components/admin/logs/Sidenav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<div className="flex">
					<Sidenav />

					<main className="flex-1 bg-gray-100 p-4 overflow-hidden">
						{children}
					</main>
				</div>
			</QueryClientProvider>
		</>
	);
};

export default PrivateLayout;
