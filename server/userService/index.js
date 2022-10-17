const express = require("express"),
	{ databaseConnection } = require("./database"),
	cors = require("cors"),
	{ userAPI } = require("./api");

require("dotenv").config();

// init express app instance
const app = express();

// adding app dependencies
app.use(express.json());
app.use(cors());

// start user service DB
databaseConnection();

// add routes
userAPI(app);

// express app starts listening on port 8001
app.listen(process.env.PORT || 8001, () => {
	console.log(`User service is listening on port ${process.env.PORT}`);
});
