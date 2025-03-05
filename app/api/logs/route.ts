import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const logs = await prisma.employeeLog.findMany({
			include: {
				employee: true,
			},
			orderBy: {
				time_in: "desc",
			},
		});

		return NextResponse.json(logs);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to fetch logs." },
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	try {
		const { employeeNo } = await req.json();
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Normalize to start of the day

		// Check if employee exists
		const employee = await prisma.employee.findUnique({
			where: { emp_no: employeeNo },
		});

		if (!employee) {
			return NextResponse.json(
				{ message: "Employee ID not found." },
				{ status: 404 }
			);
		}

		// Find today's log entry
		const existingLog = await prisma.employeeLog.findFirst({
			where: {
				employeeNo,
				time_in: { gte: today }, // Only fetch logs from today onwards
			},
		});

		if (!existingLog) {
			// No log for today, create a new one
			const createLog = await prisma.employeeLog.create({
				data: {
					time_in: new Date(),
					employeeNo,
				},
			});

			return NextResponse.json(createLog, { status: 201 });
		}

		if (existingLog.time_in && existingLog.time_out) {
			return NextResponse.json(
				{ message: "Employee already logged today." },
				{ status: 400 }
			);
		}

		// If time_in exists but time_out is null, update time_out
		const updatedLog = await prisma.employeeLog.update({
			where: { id: existingLog.id },
			data: { time_out: new Date() },
			include: { employee: true },
		});

		return NextResponse.json(updatedLog, { status: 201 });
	} catch (error: // eslint-disable next-line
	any) {
		return NextResponse.json(
			{ message: `Failed to create logs. ${error.message}` },
			{ status: 500 }
		);
	}
}
