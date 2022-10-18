const mongoose = require("mongoose");

// connecto to DB
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
		console.log(`Order DB Connected!`);
	} catch (error) {
		console.error(error);
	}
};
