import api from "./api";

const loginUser = async (formData) => {
	return api
		.post("/login", formData)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
		});
};

export { loginUser };
