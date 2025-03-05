import DataTable from "@/components/admin/employees/DataTable";
import React from "react";

const EmployeesPage = () => {
	return (
		<>
			<section className="pb-6">
				<h1 className="text-4xl font-bold">Employees</h1>
			</section>

			<section>
				<DataTable />
			</section>
		</>
	);
};

export default EmployeesPage;
