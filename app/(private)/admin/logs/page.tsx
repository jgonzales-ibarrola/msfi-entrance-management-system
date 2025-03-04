import DataTable from "@/components/admin/logs/DataTable";
import React from "react";

const LogsPage = () => {
	return (
		<>
			<section className="pb-6">
				<h1 className="text-4xl font-bold">Logs</h1>
			</section>

			<section>
				<DataTable />
			</section>
		</>
	);
};

export default LogsPage;
