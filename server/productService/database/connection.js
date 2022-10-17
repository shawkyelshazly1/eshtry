const mongoose = require("mongoose");

// connection to db
module.exports = () => {
	try {
		mongoose.connect(
			process.env.NODE_ENV === "dev"
				? process.env.MONGODB_URI_DEV
				: process.env.MONGODB_URI_PROD,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
			}
		);
		console.log("Product DB Connected!");
	} catch (error) {
		console.error(error);
	}
};
