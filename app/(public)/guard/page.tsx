import DataTable from "@/components/admin/logs/DataTable";
import Sidenav from "@/components/guard/Sidenav";
import React from "react";

const GuardPage = () => {
	return (
		<div className="flex h-screen">
			{/* Fixed Sidebar */}
			<div className="w-80 h-full text-white fixed">
				<Sidenav />
			</div>

			{/* Scrollable Content */}
			<div className="ml-80 flex-1 overflow-y-auto h-screen p-4">
				<section className="border border-black">
					{/* Header */}
					{/* Search Input */}
					{/* Data Table */}
					<DataTable />
					{/* Pagination */}
				</section>
			</div>
		</div>
	);
};

export default GuardPage;
