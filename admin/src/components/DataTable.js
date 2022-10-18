import React from "react";
import LoadingComponent from "./LoadingComponent";

export default function DataTable({ users, isLoading, error }) {
	if (isLoading) return <LoadingComponent />;
	console.log(users);
	return (
		<div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
			<table className="w-full   text-gray-500 ">
				<thead className="text-base text-gray-700 uppercase text-left sticky top-0 bg-gray-200 ">
					<tr>
						<th scope="col" className="py-3 px-6">
							<span className="sr-only">Avatar</span>
						</th>
						<th scope="col" className="py-3 px-6">
							Username
						</th>
						<th scope="col" className="py-3 px-6">
							First Name
						</th>
						<th scope="col" className="py-3 px-6">
							Last Name
						</th>

						<th scope="col" className="py-3 px-6">
							Email
						</th>
						<th scope="col" className="py-3 px-6">
							Phone Numbers
						</th>
						<th scope="col" className="py-3 px-6">
							Addresses
						</th>
						<th scope="col" className="py-3 px-6">
							<span className="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody className="text-base">
					{users.map((user) => (
						<tr className="bg-white border-b  hover:bg-gray-50 hover:text-[#434E71]">
							<th
								scope="row"
								className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
							>
								<img className="w-16 rounded-full" src={user.avatar} alt="" />
								<div className="pl-3 text-left">
									<div className="text-base font-semibold text-gray-900">
										{user.firstName} {user.lastName}
									</div>
									<div className="font-normal text-gray-500">{user.email}</div>
								</div>
							</th>
							<td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
								{user.username}
							</td>
							<td className="py-4 px-6">{user.firstName} </td>
							<td className="py-4 px-6">{user.lastName}</td>
							<td className="py-4 px-6">{user.email}</td>
							<td className="py-4 px-6">
								<ol className="">
									{user.phoneNumbers.map((phoneNumber) => (
										<li>{phoneNumber}</li>
									))}
								</ol>
							</td>
							<td className="py-4 px-6 ">
								{user.addresses.length} Addresses
								<button className="rounded-lg bg-[#623CEA] text-white px-4 py-1 ml-2">
									View
								</button>
							</td>
							<td className="py-4 px-6 text-right ">
								<a
									href="#"
									className="font-medium text-blue-600  hover:underline mr-3"
								>
									Edit
								</a>
								<a
									href="#"
									className="font-medium text-red-600  hover:underline"
								>
									Delete
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
