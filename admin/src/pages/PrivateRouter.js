import React, { useContext } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import Login from "./Login";

export default function PrivateRouter({ children }) {
	const { currentUser, authLoading } = useContext(CurrentUserContext);
	if (authLoading) return null;
	if (!currentUser) return <Login />;
	else return children;
}
