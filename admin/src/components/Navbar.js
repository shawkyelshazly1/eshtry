import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { BsCartCheckFill } from "react-icons/bs";
import { BiPurchaseTagAlt, BiCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="flex flex-col gap-2 bg-[#623CEA] text-white w-24 items-center py-8">
			<h1 className="text-5xl font-lobster font-bold ">Esh</h1>
			<div className="flex flex-col gap-6 flex-1 justify-center items-center w-full">
				<Link to={"/"}>
					<MdSpaceDashboard size="3em" />
				</Link>
				<Link to={"/users"}>
					<IoIosPeople size="3em" />
				</Link>
				<Link to={"/admins"}>
					<RiAdminFill size="3em" />
				</Link>
				<Link to={"/categories"}>
					<BiCategoryAlt size="3em" />
				</Link>
				<Link to={"/products"}>
					<BiPurchaseTagAlt size="3em" />
				</Link>
				<Link to={"/orders"}>
					<BsCartCheckFill size="3em" />
				</Link>
			</div>
		</div>
	);
}
