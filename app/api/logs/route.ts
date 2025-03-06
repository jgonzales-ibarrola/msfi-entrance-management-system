import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Start of the day

		const logs = await prisma.employeeLog.findMany({
			where: {
				time_in: { gte: today }, // Get today's logs
			},
			include: { employee: true },
			orderBy: { time_in: "desc" },
		});

		return NextResponse.json(logs);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to fetch today's logs." },
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	try {
		const { employeeNo } = await req.json();
		const now = new Date();
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Start of the day

		// Find the employee
		const employee = await prisma.employee.findUnique({
			where: { emp_no: employeeNo },
		});

		if (!employee) {
			return NextResponse.json(
				{ message: "Employee ID not found." },
				{ status: 404 }
			);
		}

		// Find the most recent log for today
		const existingLog = await prisma.employeeLog.findFirst({
			where: {
				employeeNo,
				time_in: { gte: today }, // Get today's logs
			},
			orderBy: { time_in: "desc" },
		});

		// If employee already logged in & out today, prevent re-logging
		if (existingLog?.time_in && existingLog?.time_out) {
			return NextResponse.json(
				{ message: "You are already logged out." },
				{ status: 400 }
			);
		}

		// If no log exists for today, create a new log entry
		if (!existingLog) {
			const newLog = await prisma.employeeLog.create({
				data: {
					time_in: now,
					employeeNo,
					isRestricted: true, // Restrict logout initially
				},
			});
			return NextResponse.json(newLog, { status: 201 });
		}

		// Check if employee is within the 30-second restriction period
		const thirtySecondsLater = new Date(
			existingLog.time_in.getTime() + 30 * 1000
		);
		const remainingTime = Math.ceil(
			(thirtySecondsLater.getTime() - now.getTime()) / 1000
		);

		if (existingLog.time_in && !existingLog.time_out) {
			if (existingLog.isRestricted && now < thirtySecondsLater) {
				return NextResponse.json(
					{
						message: `You must wait ${remainingTime} seconds before logging out.`,
						remainingTime,
					},
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
			{ message: "Unexpected error occurred." },
			{ status: 400 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: `Failed to create logs. ${error.message}` },
			{ status: 500 }
		);
	}
}
