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
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Date Hired
							</th>
							<th scope="col" className="px-6 py-3">
								Agency
							</th>
							<th scope="col" className="px-6 py-3">
								Department
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3">
								Date Registered
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								FI0003
							</th>
							<td className="px-6 py-4">Henry Manuel Cabansag</td>
							<td className="px-6 py-4">Undefined</td>
							<td className="px-6 py-4">MSFI</td>
							<td className="px-6 py-4">Facilities Management</td>
							<td className="px-6 py-4">ACTIVE</td>
							<td className="px-6 py-4">2022-10-18 07:15:58</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Pagination */}
		</div>
	);
};

export default DataTable;
