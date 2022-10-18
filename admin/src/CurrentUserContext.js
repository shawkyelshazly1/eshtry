import React, { useEffect, useState } from "react";
import api from "./utils/api";

// current suer context
export const CurrentUserContext = React.createContext(null);

// current user provider
export const CurrentUserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [authLoading, setAuthLoading] = useState(true);

	// check login everytime component mounted
	useEffect(() => {
		checkLogin();
	}, []);

	// check login function
	const checkLogin = () => {
		const token = localStorage.getItem("accessToken");
		setAuthLoading(true);

		if (token && token !== "") {
			api.get("/auth", {}).then((res) => {
				const user = res.data.user;

				setAuthLoading(false);
				if (user) {
					setCurrentUser(user);
				}
			});
		} else {
			setAuthLoading(false);
			setCurrentUser(null);
		}
	};

	//handle logout
	const handleLogout = () => {
		// remove user and token from localstorage
		localStorage.setItem("accessToken", "");
		setCurrentUser(null);
	};

	// state initial values
	const stateValues = {
		currentUser,
		setCurrentUser,
		authLoading,
		setAuthLoading,
		checkLogin,
		handleLogout,
	};

	return (
		<CurrentUserContext.Provider value={stateValues}>
			{children}
		</CurrentUserContext.Provider>
	);
};
