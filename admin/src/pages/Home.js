import React from "react";
import DisplayCard from "../components/DisplayCard";

export default function Home() {
	return (
		<div className="flex w-full h-full p-5 flex-col gap-4">
			<h1 className="text-3xl font-medium text-[#434E71] font-roboto">
				Dashboard
			</h1>
			<div className="grid grid-cols-8 grid-flow-col w-[90%] gap-10">
				<DisplayCard header={"Products"} value={"50"} />
				<DisplayCard header={"Users"} value={"50"} />
				<DisplayCard header={"Orders"} value={"50"} />
				<DisplayCard header={"Orders"} value={"50"} />
			</div>
		</div>
	);
}
