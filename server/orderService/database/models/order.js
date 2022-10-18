const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		status: {
			type: String,
			enum: ["initiated", "processing", "shipped", "delievered", "cancelled"],
			required: true,
			default: "initiated",
		},
		amount: { type: mongoose.SchemaTypes.Number, required: true },
		items: [
			{
				id: { type: mongoose.SchemaTypes.ObjectId, required: true },
				title: { type: String, required: true, trim: true },
				price: {
					type: mongoose.SchemaTypes.Number,
					required: true,
					trim: true,
				},
				quantity: {
					type: mongoose.SchemaTypes.Number,
					required: true,
					trim: true,
				},
				cover: { type: String, required: true, trim: true },
			},
		],
		userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
	},
	{ timeStamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
