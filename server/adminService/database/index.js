const { connectUserDB } = require("./connection");

module.exports = {
	databaseConnection: require("./connection"),
	AdminRepository: require("./repository/admin-repository"),
};
