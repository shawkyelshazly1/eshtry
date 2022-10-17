const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		username: { type: String, required: true, unique: true, trim: true },
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true },
		password: { type: String, required: true, trim: true },
		addresses: [
			{ type: mongoose.SchemaTypes.ObjectId, ref: "address", required: true },
		],
		phoneNumbers: [{ type: mongoose.SchemaTypes.Number, trim: true }],
		avatar: {
			type: String,
			default:
				"https://i.postimg.cc/9Q70Hm5H/Avatar-Profile-PNG-Image-File.png",
		},
	},
	{ timeStamps: true }
);

module.exports = mongoose.model("User", userSchema);
