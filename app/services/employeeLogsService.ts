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
