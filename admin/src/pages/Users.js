import React from "react";
import DataTable from "../components/DataTable";
import { useQuery } from "react-query";
import { loadUsers } from "../utils/dataAPIs";

export default function Users() {
	const { data, isLoading, error } = useQuery(["users"], loadUsers, {
		staleTime: 120000,
	});

	return (
		<div className="flex h-full p-5 flex-col gap-4 w-[90%]">
			<h1 className="text-3xl font-medium text-[#434E71] font-roboto">Users</h1>
			<DataTable users={data} isLoading={isLoading} error={error} />
		</div>
	);
}
