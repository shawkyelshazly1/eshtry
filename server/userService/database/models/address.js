const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
	{
		city: { type: String, trim: true },
		state: { type: String, trim: true },
		country: { type: String, trim: true },
		street: { type: String, trim: true },
		zipcode: { type: mongoose.SchemaTypes.Number, trim: true },
	},
	{ timeStamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
