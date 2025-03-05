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
		today.setHours(0, 0, 0, 0); // Start of the day

		const employee = await prisma.employee.findUnique({
			where: { emp_no: employeeNo },
		});

		if (!employee) {
			return NextResponse.json(
				{ message: "Employee ID not found." },
				{ status: 404 }
			);
		}

		const existingLog = await prisma.employeeLog.findFirst({
			where: {
				employeeNo,
				time_in: { gte: today }, // Fetch today's logs
			},
		});

		if (!existingLog) {
			// First log-in of the day
			const createLog = await prisma.employeeLog.create({
				data: {
					time_in: now,
					employeeNo,
					isRestricted: true, // Initially restrict logout
				},
			});

			return NextResponse.json(createLog, { status: 201 });
		}

		const thirtySecondsLater = new Date(
			existingLog.time_in.getTime() + 30 * 1000
		);
		const remainingTime = Math.ceil(
			(thirtySecondsLater.getTime() - now.getTime()) / 1000
		);

		if (existingLog.time_in && !existingLog.time_out) {
			if (existingLog.isRestricted && now < thirtySecondsLater) {
				// Send remaining countdown time
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
