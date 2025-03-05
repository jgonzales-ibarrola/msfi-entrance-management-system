"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { LuNotebookPen } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";

const Sidenav = () => {
	const pathname = usePathname();

	const links = [
		{
			label: "Analytics",
			href: "/admin",
			icon: <FaChartBar />,
			isActive: pathname === "/admin",
		},
		{
			label: "Employee",
			href: "/admin/employees",
			icon: <LuNotebookPen />,
			isActive: pathname === "/admin/employees",
		},
        {
			label: "Logs",
			href: "/admin/logs",
			icon: <LuNotebookPen />,
			isActive: pathname === "/admin/logs",
		},
	];

	return (
		<div className="flex-none h-screen w-64 bg-gray-900">
			<ul className="m-0 p-0">
				{links.map((link, index) => {
					const { icon, href, isActive, label } = link;

					return (
						<li key={href + index} className="list-none m-0">
							<Link
								href={href}
								className={cn(
									"flex items-center gap-2 p-3 hover:bg-gray-200",
									isActive ? "bg-yellow" : "bg-gray-300"
								)}
							>
								{icon}
								{label}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Sidenav;
