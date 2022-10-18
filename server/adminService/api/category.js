const { StartMessaging } = require("../utils");
const adminAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
	// create category
	app.post("/categories/create", adminAuth, async (req, res, next) => {
		const { title, description, cover } = req.body;
		if (!(title && description && cover)) {
			return res.status(409).json({ msg: "Category data is required." });
		}

		//publish message to productQueue and wait for response to consume and send
		await StartMessaging(
			channel,
			"ADMIN-PRODUCT",
			"PRODUCT-ADMIN",
			"CREATE-CATEGORY",
			{ title, description, cover },
			res
		);
	});
};
