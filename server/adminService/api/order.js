const { StartMessaging } = require("../utils");
const adminAuth = require("./middlewares/auth");
module.exports = (app, channel) => {
	// get all orders
	app.get("/orders", adminAuth, async (req, res, next) => {
		// send and recieve messages and send res back to api call
		StartMessaging(
			channel,
			"ADMIN-ORDER",
			"ORDER-ADMIN",
			"GET-ORDERS",
			{},
			res
		);
	});

	// cancel order by id
	app.put("/orders/cancel/:orderId", adminAuth, async (req, res, next) => {
		const { orderId } = req.params;
		// send and recieve messages and send res back to api call
		StartMessaging(
			channel,
			"ADMIN-ORDER",
			"ORDER-ADMIN",
			"UPDATE-ORDER-STATUS",
			{ orderId, status: "cancelled" },
			res
		);
	});

	// update order status by id
	app.put("/orders/:orderId", adminAuth, async (req, res, next) => {
		const { orderId } = req.params;
		const { status } = req.body;
		// send and recieve messages and send res back to api call
		StartMessaging(
			channel,
			"ADMIN-ORDER",
			"ORDER-ADMIN",
			"UPDATE-ORDER-STATUS",
			{ orderId, status },
			res
		);
	});

	// delete order by id
	app.delete("/orders/:orderId", adminAuth, async (req, res, next) => {
		const { orderId } = req.params;
		// send and recieve messages and send res back to api call
		StartMessaging(
			channel,
			"ADMIN-ORDER",
			"ORDER-ADMIN",
			"DELETE-ORDER",
			{ orderId },
			res
		);
	});
};
