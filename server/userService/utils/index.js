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
		await channel.assertQueue("USER-ADMIN");
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
		case "CREATE":
			const { data } = await service.CreateUser(messageData.payload);

			this.PublishMessage(channel, "USER-ADMIN", { data });
			break;
		case "DELETE":
			const { data: user } = await service.DeleteUser(
				messageData.payload.userId
			);
			this.PublishMessage(channel, "USER-ADMIN", { data: user });
			break;
		case "GET-ONE":
			const { data: foundUser } = await service.GetUserById(
				messageData.payload.userId
			);
			this.PublishMessage(channel, "USER-ADMIN", { data: foundUser });

			break;
		case "GET-ALL":
			const { data: users } = await service.GetAllUsers();
			this.PublishMessage(channel, "USER-ADMIN", { data: users });
			break;

		default:
			break;
	}
};
