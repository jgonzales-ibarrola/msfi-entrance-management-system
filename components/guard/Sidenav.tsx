import Image from "next/image";
import React from "react";

import MSFILogo from "@/public/msfi-logo.png";

const Sidenav = () => {
	return (
		<div className="flex-none flex flex-col justify-between w-full h-screen p-4">
			<div className="grid gap-4">
				{/* Image Logo MacroAsia */}
				<div className="flex justify-center">
					<Image
						src={MSFILogo}
						alt="MSFI Logo"
						width={980} // Set a proper width
						height={256} // Set a proper height (keep aspect ratio)
						className="object-contain"
						priority // Optimizes loading
					/>
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
