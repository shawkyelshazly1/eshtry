const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	cover: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("Category", categorySchema);
