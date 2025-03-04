import React from "react";

const DataTable = () => {
	return (
		<div>
			{/* Search filter */}
			{/* Table */}

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
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								FI0142
							</th>
							<td className="px-6 py-4">Jomer C. Oba</td>
							<td className="px-6 py-4">Organic</td>
							<td className="px-6 py-4">Finance & Admin</td>
							<td className="px-6 py-4">IN</td>
							<td className="px-6 py-4 flex items-center gap-2">
                                <div>
                                    2025-02-24 - 08:23:21
                                </div>
                                <span>-</span>
                                <div>2025-02-24 - 16:23:25</div>
                            </td>
						</tr>

                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								FI0142
							</th>
							<td className="px-6 py-4">Jomer C. Oba</td>
							<td className="px-6 py-4">Organic</td>
							<td className="px-6 py-4">Finance & Admin</td>
							<td className="px-6 py-4">IN</td>
							<td className="px-6 py-4 flex items-center gap-2">
                                <div>
                                    2025-02-24 - 08:23:21
                                </div>
                                <span>-</span>
                                <div>IN</div>
                            </td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Pagination */}
            
		</div>
	);
};

export default DataTable;
