import Image from "next/image";
import React from "react";

import MSFILogo from "@/public/msfi-logo.png";

const Sidenav = () => {
	return (
		<div className="flex-none flex flex-col justify-between w-80 h-screen">
			<div className="grid gap-4">
				{/* Image Logo MacroAsia */}
				<div className="relative h-24 py-4">
					<Image src={MSFILogo} alt="MSFI-Logo" fill />
				</div>
				{/* ID or Card */}
				<div>
					<h4>ID or Card</h4>
				</div>
			</div>

			{/* Footer Logout Button */}
			<div>
				<h4>Footer Logout</h4>
			</div>
		</div>
	);
};

export default Sidenav;
