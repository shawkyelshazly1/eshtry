import React, { useContext } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import { MdLogout } from "react-icons/md";

export default function UserNavigation() {
	const { currentUser, authLoading, handleLogout } =
		useContext(CurrentUserContext);
	if (authLoading) return null;

	console.log(currentUser);
	return (
		<div className="flex flex-row absolute right-3 gap-2 top-4 items-center">
			<div className="flex flex-col items-center justify-center">
				<div>
					<img src={currentUser.avatar} alt="" className="w-16 " />
				</div>
				<h1 className="font-roboto text-lg font-medium text-gray-500">
					{currentUser.username}
				</h1>
			</div>
			<MdLogout
				size="2.5em"
				onClick={handleLogout}
				className="cursor-pointer"
			/>
		</div>
	);
}
