const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: mongoose.SchemaTypes.Number, required: true },
	cover: { type: String, required: true, trim: true },
	images: [{ type: String, trim: true }],
	categoryId: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "category",
		required: true,
	},
	quantity: { type: mongoose.SchemaTypes.Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
