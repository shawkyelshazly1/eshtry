const jwt = require("jsonwebtoken"),
	amqplib = require("amqplib");

// helper to calculate order amount
module.exports.calculateOrderTotal = async (items) => {
	console.log(items);
	let total = 0;
	items.map((item) => {
		total += item.price * item.quantity;
	});
	return total;
};

// format data or return error
module.exports.FormateData = (data) => {
	if (data) {
		return { data };
	} else {
		throw new Error("Data Not found!");
	}
};

// validate access token
module.exports.validateAccessToken = async (req) => {
	const token = req.get("authorization");
	if (token) {
		const payload = await jwt.verify(
			token.split(" ")[1],
			process.env.APP_ACCESS_TOKEN_SECRET
		);
		req.user = payload;
		return true;
	}
	return false;
};

// create message broker
module.exports.CreateChannel = async () => {
	try {
		const connection = await amqplib.connect(
			process.env.AMQPLIB_CONNECTION_URL
		);
		const channel = await connection.createChannel();
		await channel.assertQueue("ORDER-ADMIN");
		await channel.assertQueue("ORDER-PRODUCT");
		return channel;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// publish message to the amqplib queue
module.exports.PublishMessage = (channel, queue, msg) => {
	channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
	console.log("Sent: ", msg, "to '", queue, "' queue.");
};

// subscribe and consume incoming messages
module.exports.SubscribeMessage = async (channel, queue, service) => {
	await channel.consume(queue, (data) => {
		channel.ack(data);
		this.handleServices(channel, JSON.parse(data.content), service);
	});
};

// handle service switch function
module.exports.handleServices = async (channel, messageData, service) => {
	switch (messageData.action) {
		case "GET-ORDERS":
			const { data } = await service.loadAllOrders();
			this.PublishMessage(channel, "ORDER-ADMIN", { data });
			break;

		case "UPDATE-ORDER-STATUS":
			const { orderId, status } = messageData.payload;
			const { data: updatedOrder } = await service.updateOrderStatus(
				orderId,
				status
			);
			this.PublishMessage(channel, "ORDER-ADMIN", { data: updatedOrder });
			break;
		case "DELETE-ORDER":
			const { orderId: id } = messageData.payload;
			const { data: deletedorder } = await service.deleteOrder(id);
			this.PublishMessage(channel, "ORDER-ADMIN", { data: deletedorder });
			break;

		default:
			break;
	}
};

// start Messaging function which returns response with the API result
module.exports.StartMessaging = async (
	channel,
	publishQueue,
	consumeQueue,
	action,
	payload,
	res
) => {
	// publish message to user service to create user
	this.PublishMessage(channel, publishQueue, {
		action,
		payload,
	});

	// subscribe to get message from user service with result
	this.SubscribeMessage(channel, consumeQueue, res);
};
