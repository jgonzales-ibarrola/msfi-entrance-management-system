"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<main>{children}</main>
			</QueryClientProvider>
		</>
	);
};

export default PublicLayout;
