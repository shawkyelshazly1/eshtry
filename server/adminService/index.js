const express = require("express"),
	cors = require("cors");
require("dotenv").config();
const { databaseConnection } = require("./database");

const { adminAPI, userAPI } = require("./api");
const { CreateChannel } = require("./utils");

// init app instance
const app = express();

// add app dependencies
app.use(express.json());
app.use(cors());

//start db connection
databaseConnection();

// connect rabbitmqlp
let channel;
CreateChannel()
	.then((res) => {
		channel = res;
	})
	.then((_) => {
		// setting routes
		adminAPI(app);
		userAPI(app, channel);
	});

// express app starts listening on port 8004
app.listen(process.env.PORT || 8004, () => {
	console.log(`Admin service is listening on port ${process.env.PORT}`);
});
