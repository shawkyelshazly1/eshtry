import React from "react";

export default function DisplayCard({ header, value }) {
	return (
		<div className="flex flex-col items-start rounded-lg h-fit min-h-[150px] p-3 shadow-lg col-span-1 ">
			<h1 className="text-lg font-medium text-gray-500">{header}</h1>
			<p className="text-6xl font-medium flex flex-1 self-center items-center justify-center text-[#434E71]">
				{value}
			</p>
		</div>
	);
}
