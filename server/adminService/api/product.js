const { StartMessaging } = require("../utils");
const adminAuth = require("./middlewares/auth");
module.exports = (app, channel) => {
	// create product
	app.post("/products/create",adminAuth, async (req, res, next) => {
		const { title, description, price, cover, categoryId, quantity } = req.body;

		if (!(title && description && price && cover && categoryId && quantity)) {
			return res.status(409).json({ msg: "Product data is required." });
		}

		// setting default images
		let images;
		if (req.body.images) {
			images = req.body.images;
		} else {
			images = [];
		}

		//publish message to productQueue and wait for response to consume and send
		await StartMessaging(
			channel,
			"ADMIN-PRODUCT",
			"PRODUCT-ADMIN",
			"CREATE-PRODUCT",
			{ title, description, price, cover, categoryId, quantity, images },
			res
		);
	});

	// delete product
	app.delete("/products/:productId",adminAuth, async (req, res, next) => {
		const { productId } = req.params;
		if (!productId) {
			return res.status(409).json({ msg: "Product ID is required." });
		}

		//publish message to productQueue and wait for response to consume and send
		await StartMessaging(
			channel,
			"ADMIN-PRODUCT",
			"PRODUCT-ADMIN",
			"DELETE-PRODUCT",
			{ productId },
			res
		);
	});

	// update product
	app.put("/products/:productId",adminAuth, async (req, res, next) => {
		const { productId } = req.params;
		const { title, description, price, cover, categoryId, quantity } = req.body;
		if (
			!(
				title &&
				description &&
				price &&
				cover &&
				categoryId &&
				quantity &&
				productId
			)
		) {
			return res.status(409).json({ msg: "Product data is required." });
		}

		// setting default images
		let images;
		if (req.body.images) {
			images = req.body.images;
		} else {
			images = [];
		}

		//publish message to productQueue and wait for response to consume and send
		await StartMessaging(
			channel,
			"ADMIN-PRODUCT",
			"PRODUCT-ADMIN",
			"UPDATE-PRODUCT",
			{
				id: productId,
				title,
				description,
				price,
				cover,
				categoryId,
				quantity,
				images,
			},
			res
		);
	});
};
