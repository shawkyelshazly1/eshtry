const amqplib = require("amqplib");

// format data or return error
module.exports.FormateData = (data) => {
	if (data) {
		return { data };
	} else {
		throw new Error("Data Not found!");
	}
};

// create message broker
module.exports.CreateChannel = async () => {
	try {
		const connection = await amqplib.connect(
			process.env.AMQPLIB_CONNECTION_URL
		);
		const channel = await connection.createChannel();
		await channel.assertQueue("PRODUCT-ADMIN");
		await channel.assertQueue("PRODUCT-ORDER");
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

// switch to handle the messages actions from other services
module.exports.handleServices = async (channel, messageData, service) => {
	switch (messageData.action) {
		case "CREATE-PRODUCT":
			const { data } = await service.addProduct(messageData.payload);

			this.PublishMessage(channel, "PRODUCT-ADMIN", { data });
			break;
		case "DELETE-PRODUCT":
			const { data: deletedProduct } = await service.deleteProduct(
				messageData.payload.productId
			);
			this.PublishMessage(channel, "PRODUCT-ADMIN", { data: deletedProduct });
			break;
		case "UPDATE-PRODUCT":
			const { data: updatedProduct } = await service.updateProduct(
				messageData.payload
			);
			this.PublishMessage(channel, "PRODUCT-ADMIN", { data: updatedProduct });

			break;
		case "CREATE-CATEGORY":
			const { data: createdCategory } = await service.addCategory(
				messageData.payload
			);
			this.PublishMessage(channel, "PRODUCT-ADMIN", { data: createdCategory });
			break;
		case "UPDATE_QUANTITY":
			messageData.payload.items.map(async (item) => {
				console.log(item);
				const { data: updatedProductWithQuantity } =
					await service.updateProductQuantity(item.id, item.quantity);
				this.PublishMessage(channel, "PRODUCT-ORDER", {
					data: updatedProductWithQuantity,
				});
			});

		default:
			break;
	}
};
