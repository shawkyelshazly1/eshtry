const bcryptjs = require("bcryptjs"),
	jwt = require("jsonwebtoken"),
	amqplib = require("amqplib");

// validate password utillity
module.exports.validatePassword = async (enteredPassword, userPassword) => {
	return await bcryptjs.compareSync(enteredPassword, userPassword);
};

// hash password
module.exports.generateHashPassword = async (password) => {
	return await bcryptjs.hashSync(password, 10);
};

// generate access token
module.exports.generateAccessToken = async (payload) => {
	return jwt.sign(payload.toJSON(), process.env.APP_ACCESS_TOKEN_SECRET, {
		expiresIn: "1w",
	});
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
		await channel.assertQueue("ADMIN-USER");

		return channel;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports.PublishMessage = (channel, queue, msg) => {
	channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
	console.log("Sent: ", msg, "to '", queue, "' queue.");
};

module.exports.SubscribeMessage = async (channel, queue, res) => {
	let msg;
	channel.consume(queue, (data) => {
		msg = JSON.parse(data.content).data;
		channel.ack(data);
		channel.cancel(data.fields.consumerTag);
		return res.status(200).json(msg);
	});
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
