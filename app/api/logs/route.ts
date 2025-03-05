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
		const now = new Date();
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
				time_in: { gte: today }, // Fetch logs from today onwards
			},
		});

		if (!existingLog) {
			// No log for today, create a new one with isRestricted = true
			const createLog = await prisma.employeeLog.create({
				data: {
					time_in: now,
					employeeNo,
					isRestricted: true, // Restrict logout initially
				},
			});

			return NextResponse.json(createLog, { status: 201 });
		}

		// Restrict logout within 30 seconds
		const thirtySecondsLater = new Date(
			existingLog.time_in.getTime() + 30 * 1000
		);

		if (existingLog.time_in && !existingLog.time_out) {
			if (existingLog.isRestricted && now < thirtySecondsLater) {
				// Employee tries to log out before 30s → Restrict
				return NextResponse.json(
					{ message: "You must wait 30 seconds before logging out." },
					{ status: 403 }
				);
			}

			// Allow logout and remove restriction
			const updatedLog = await prisma.employeeLog.update({
				where: { id: existingLog.id },
				data: { time_out: now, isRestricted: false },
				include: { employee: true },
			});

			return NextResponse.json(updatedLog, { status: 201 });
		}

		return NextResponse.json(
			{ message: "Employee already logged today." },
			{ status: 400 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: `Failed to create logs. ${error.message}` },
			{ status: 500 }
		);
	}
}
