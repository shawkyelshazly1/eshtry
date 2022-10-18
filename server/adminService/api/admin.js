const AdminService = require("../services/admin-service");
const { PublishMessage } = require("../utils");
const adminAuth = require("./middlewares/auth");

module.exports = (app) => {
	// create user service instance
	const service = new AdminService();

	// signin Route
	app.post("/login", async (req, res, next) => {
		const { email, password } = req.body;
		if (!(email && password)) {
			return res.status(409).json({ msg: "Email & Password are required." });
		}
		const { data } = await service.SignIn({ email, password });
		return data.status === "success"
			? res.status(200).json({ user: data.user, token: data.token })
			: res.status(401).json({ error: data.msg });
	});

	//register Route
	app.post("/register", async (req, res, next) => {
		const { email, username, password, firstName, lastName } = req.body;
		if (!(email && password && username && firstName && lastName)) {
			return res.status(409).json({ msg: "Registration data is required." });
		}
		const { data } = await service.SignUp({
			email,
			username,
			password,
			firstName,
			lastName,
		});

		return res.status(200).json(data);
	});

	// delete User Route
	app.delete("/profile/:userId", adminAuth, async (req, res, next) => {
		const { userId } = req.params;
		const { data } = await service.DeleteUser(userId);
		return res.status(200).json(data);
	});

	// get User by id Route
	app.get("/profile/:userId", adminAuth, async (req, res, next) => {
		const { userId } = req.params;
		const { data } = await service.GetUserById(userId);
		return res.status(200).json(data);
	});

	// get current User
	app.get("/profile", adminAuth, async (req, res, next) => {
		const { _id } = req.user;
		const { data } = await service.GetUserById(_id);
		return res.status(200).json(data);
	});

	// get current User
	app.get("/auth", adminAuth, async (req, res, next) => {
		const { _id } = req.user;
		console.log(_id);
		const { data } = await service.GetUserById(_id);
		return res.status(200).json(data);
	});

	// get users Route
	app.get("/profiles", adminAuth, async (req, res, next) => {
		const { data } = await service.GetAllUsers();
		return res.status(200).json(data);
	});
};
