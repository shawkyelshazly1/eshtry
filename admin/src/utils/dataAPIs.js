import api from "./api";

const loadUsers = async () => {
	return api
		.get("/users")
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.error(err);
		});
};

export { loadUsers };
