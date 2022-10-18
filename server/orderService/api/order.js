const OrderService = require("../services/order-service");
const { SubscribeMessage } = require("../utils");
const userAuth = require("./middlewares/auth");
module.exports = (app, channel) => {
	const service = new OrderService(channel);

	SubscribeMessage(channel, "ADMIN-ORDER", service);

	// get order details
	app.get("/id/:orderId", userAuth, async (req, res, next) => {
		const { orderId } = req.params;
		const { data } = await service.loadOrder(orderId, req.user._id);
		return res.status(200).json(data);
	});

	// get user orders
	app.get("/all", userAuth, async (req, res, next) => {
		console.log(req.user._id);
		const { data } = await service.loadUserOrders(req.user._id);
		return res.status(200).json(data);
	});

	// create Order
	app.post("/create", userAuth, async (req, res, next) => {
		const { items } = req.body;
		const { data } = await service.createOrder(req.user._id, items);
		return res.status(200).json(data);
	});

	// cancel order
	app.put("/cancel/:orderId", userAuth, async (req, res, next) => {
		const { orderId } = req.params;
		const { data } = await service.cancelOrder(orderId, req.user._id);
		return res.status(200).json(data);
	});
};
