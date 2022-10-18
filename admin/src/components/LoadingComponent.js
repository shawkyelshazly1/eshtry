import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

export default function LoadingComponent() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<SyncLoader color="#623CEA" />
		</div>
	);
}
