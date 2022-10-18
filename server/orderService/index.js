const express = require("express"),
	cors = require("cors");
const { orderAPI } = require("./api");
const { databaseConnection } = require("./database");
const { CreateChannel } = require("./utils");

require("dotenv").config();

const app = express();

// adding app dependencies
app.use(express.json());
app.use(cors());

// start order db connection
databaseConnection();

// connect rabbitmq
let channel;
CreateChannel()
	.then((res) => {
		channel = res;
	})
	.then((_) => {
		// register Routes
		orderAPI(app, channel);
	});

// express app starts listening on port 8003
app.listen(process.env.PORT || 8003, () => {
	console.log(`Order service is listening on port ${process.env.PORT}.`);
});
