"use client";

import React from "react";

import Scanner from "./Scanner";

import { useQuery } from "@tanstack/react-query";

import { fetchEmployeeLogs } from "@/app/services/employeeLogsService";

import { format } from "date-fns";

const DataTable = () => {
	const {
		data: employeeLogs,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ["employeeLogs"],
		queryFn: fetchEmployeeLogs,
	});

	return (
		<div>
			{/* Search filter */}
			{/* Table */}

			<Scanner />

			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-yellow dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								ID
							</th>
							<th scope="col" className="px-6 py-3">
								Employee Name
							</th>
							<th scope="col" className="px-6 py-3">
								Agency
							</th>
							<th scope="col" className="px-6 py-3">
								Department
							</th>
							<th scope="col" className="px-6 py-3">
								Remarks
							</th>
							<th scope="col" className="px-6 py-3">
								Date & Time
							</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
								<th
									colSpan={6}
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									Fetching data...
								</th>
							</tr>
						) : isError ? (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
								<th
									colSpan={6}
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									Error fetching data...
								</th>
							</tr>
						) : employeeLogs?.length === 0 ? (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
								<th
									colSpan={6}
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									No data found.
								</th>
							</tr>
						) : (
							employeeLogs?.map((employee) => {
								const isIn = employee.time_in;
								const formatDate = (dateString: string) => {
									if (!dateString) return "N/A";
									return format(
										new Date(dateString),
										"yyyy-MM-dd - HH:mm:ss"
									);
								};

								return (
									<tr
										key={employee.employee.id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
									>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{employee.employeeNo}
										</th>
										<td className="px-6 py-4">
											{employee.employee.emp_name}
										</td>
										<td className="px-6 py-4">
											{employee.employee.agency}
										</td>
										<td className="px-6 py-4">
											{employee.employee.department}
										</td>
										<td className="px-6 py-4">
											{isIn ? "IN" : "OUT"}
										</td>
										<td className="px-6 py-4 flex items-center gap-2">
											<div>
												{formatDate(
													employee.time_in.toString()
												)}
											</div>
											<span>-</span>
											<div>
												{formatDate(
													employee.time_out?.toString() ??
														"N/A"
												)}
											</div>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
		</div>
	);
};

export default DataTable;
