const express = require("express"),
	cors = require("cors");
const { productAPI } = require("./api");
const { databaseConnection } = require("./database");
const { CreateChannel } = require("./utils");
require("dotenv").config();

// init express instance
const app = express();

// adding app dependencies
app.use(express.json());
app.use(cors());

// start product service DB connection
databaseConnection();

// connect rabbitmqlp
let channel;
CreateChannel()
	.then((res) => {
		channel = res;
	})
	.then((_) => {
		//add routes
		productAPI(app, channel);
	});

// express app starts listening on port 8002
app.listen(process.env.PORT || 8002, () => {
	console.log(`Product service is listening on port ${process.env.PORT}`);
});
