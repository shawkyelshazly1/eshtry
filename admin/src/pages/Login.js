import React, { useContext, useState } from "react";
import { loginUser } from "../utils/authAPIs";
import { setAccessToken } from "../utils/helpers";
import axios from "../utils/api";
import { CurrentUserContext } from "../CurrentUserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const { setCurrentUser } = useContext(CurrentUserContext);
	const navigate = useNavigate();
	// formData state for form submission and inputs
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	//handle form submission
	const handleFormSubmission = (e) => {
		e.preventDefault();
		loginUser(formData)
			.then((res) => {
				setAccessToken(res.data.token);
				// set axios api token in header initially after login
				axios.defaults.headers.authorization = `Bearer ${res.data.token}`;
				setCurrentUser(res.data.user);
				navigate("/");
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// handle input change
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<div className="flex flex-col gap-3 items-center justify-center w-full mb-8">
				<h1 className="font-roboto font-extrabold text-9xl text-[#623cea]">
					Eshtry
				</h1>
				<h3 className="font-roboto font-medium text-3xl text-gray-400">
					Admin Panel
				</h3>
			</div>
			<form
				onSubmit={handleFormSubmission}
				className="flex flex-col gap-4 items-center  w-2/4"
			>
				<div className="flex flex-col gap-2 items-start">
					<input
						onChange={handleInputChange}
						required
						type="email"
						name="email"
						id="email"
						placeholder="Email Address"
						className="bg-gray-100 rounded-full px-6 py-2 text-2xl focus:outline-none"
					/>
				</div>

				<div className="flex flex-col gap-2 items-start">
					<input
						onChange={handleInputChange}
						required
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						className="bg-gray-100 rounded-full px-6 py-2 text-2xl focus:outline-none"
					/>
				</div>
				<button
					type="submit"
					className="text-white bg-[#623cea] px-6 py-2 rounded-full font-medium text-2xl w-1/4"
				>
					Login
				</button>
			</form>
		</div>
	);
}
