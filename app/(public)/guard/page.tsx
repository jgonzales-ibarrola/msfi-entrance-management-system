import DataTable from "@/components/admin/logs/DataTable";
import Sidenav from "@/components/guard/Sidenav";
import React from "react";

const GuardPage = () => {
	return (
		<>
			<div className="flex gap-4">
				<Sidenav />

				<section className="flex-1 border border-black">
					{/* Header */}
					{/* Search Input */}
					{/* Data Table */}
					<DataTable />
					{/* Pagination */}
				</section>
			</div>
		</>
	);
};

export default GuardPage;
