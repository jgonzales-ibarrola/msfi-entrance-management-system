import { Prisma } from "@prisma/client";

export async function fetchEmployeeLogs(): Promise<
	Prisma.EmployeeLogGetPayload<{ include: { employee: true } }>[]
> {
	const res = await fetch("/api/logs", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});

	if (!res.ok) {
		throw new Error("Having problem with server.");
	}

	return res.json();
}

export async function createEmployeeLog(values: { employeeNo: string }) {
	const res = await fetch("/api/logs", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(values),
	});

	const data = await res.json(); // Extract JSON response

	if (!res.ok) {
		throw new Error(data.message || "Something went wrong"); // Throw the error message from API
	}

	return data;
}
