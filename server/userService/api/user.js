const UserService = require("../services/user-service"),
	userAuth = require("./middlewares/auth");

// main api routes
module.exports = (app) => {
	// create userService instance
	const service = new UserService();

	// signin Route
	app.post("/login", async (req, res, next) => {
		const { email, password } = req.body;
		if (!(email && password)) {
			return res.status(409).json({ msg: "Email & Password are required." });
		}
		const { data } = await service.SignIn({ email, password });
		return res.status(200).json(data);
	});

	//signup Route
	app.post("/register", async (req, res, next) => {
		const { email, username, password, firstName, lastName } = req.body;

		if (!(email && username && password && firstName && lastName)) {
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

	// get user by id route
	app.get("/profile", userAuth, async (req, res, next) => {
		const { _id } = req.user;
		console.log(_id);
		const { data } = await service.GetUserById(_id);

		return res.status(200).json(data);
	});

	// add new address
	app.post("/address", userAuth, async (req, res, next) => {
		const { _id } = req.user;
		const { city, state, country, street, zipcode } = req.body;

		const { data } = await service.AddNewAddress(_id, {
			city,
			state,
			country,
			street,
			zipcode,
		});

		return res.status(200).json(data);
	});

	// update Address
	app.put("/address", userAuth, async (req, res, next) => {
		const { city, state, country, street, zipcode, address_id } = req.body;

		const { data } = await service.UpdateAddress({
			address_id,
			city,
			state,
			country,
			street,
			zipcode,
		});

		return res.status(200).json(data);
	});
};
