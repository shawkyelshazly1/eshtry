const AdminService = require("../services/admin-service");
const { PublishMessage, SubscribeMessage } = require("../utils");
const adminAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
	// create User
	app.post("/users/create", adminAuth, async (req, res, next) => {
		const { username, email, password, firstName, lastName } = req.body;
		if (!(email && password && username && firstName && lastName)) {
			return res.status(409).json({ msg: "Registration data is required." });
		}
		// publish message to user service to create user
		PublishMessage(channel, "ADMIN-USER", {
			action: "CREATE",
			payload: { username, email, password, firstName, lastName },
		});

		// subscribe to get message from user service with result
		SubscribeMessage(channel, "USER-ADMIN", res);
	});

	// delete User
	app.delete("/users/:userId", async (req, res, next) => {
		const { userId } = req.params;
	});

	// get User
	app.get("/users/:userId", async (req, res, next) => {
		const { userId } = req.params;
	});

	// get all Users
	app.get("/users", async (req, res, next) => {});
};
