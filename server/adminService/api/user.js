const AdminService = require("../services/admin-service");
const { StartMessaging } = require("../utils");
const adminAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
	// create User
	app.post("/users/create", adminAuth, async (req, res, next) => {
		const { username, email, password, firstName, lastName } = req.body;
		if (!(email && password && username && firstName && lastName)) {
			return res.status(409).json({ msg: "Registration data is required." });
		}

		// publish message to user service and send res with the result consumed from the queue
		await StartMessaging(
			channel,
			"ADMIN-USER",
			"USER-ADMIN",
			"CREATE",
			{
				username,
				email,
				password,
				firstName,
				lastName,
			},
			res
		);
	});

	// delete User
	app.delete("/users/:userId", adminAuth, async (req, res, next) => {
		const { userId } = req.params;
		StartMessaging(
			channel,
			"ADMIN-USER",
			"USER-ADMIN",
			"DELETE",
			{ userId },
			res
		);
	});

	// get User
	app.get("/users/:userId", adminAuth, async (req, res, next) => {
		const { userId } = req.params;
		StartMessaging(
			channel,
			"ADMIN-USER",
			"USER-ADMIN",
			"GET-ONE",
			{ userId },
			res
		);
	});

	// get all Users
	app.get("/users", adminAuth, async (req, res, next) => {
		// publish message to user service and send res with the result consumed from the queue

		StartMessaging(channel, "ADMIN-USER", "USER-ADMIN", "GET-ALL", {}, res);
	});
};
