const bcryptjs = require("bcryptjs"),
	jwt = require("jsonwebtoken");

// validate password utillity
module.exports.validatePassword = async (enteredPassword, userPassword) => {
	return await bcryptjs.compareSync(enteredPassword, userPassword);
};

// hash password
module.exports.generateHashPassword = async (password) => {
	return await bcryptjs.hashSync(password, 10);
};

// generate access token
module.exports.generateAccessToken = async (payload) => {
	return jwt.sign(payload.toJSON(), process.env.APP_ACCESS_TOKEN_SECRET, {
		expiresIn: "1w",
	});
};

// validate access token
module.exports.validateAccessToken = async (req) => {
	const token = req.get("authorization");
	if (token) {
		const payload = await jwt.verify(
			token.split(" ")[1],
			process.env.APP_ACCESS_TOKEN_SECRET
		);
		req.user = payload;
		return true;
	}
	return false;
};

// format data or return error
module.exports.FormateData = (data) => {
	if (data) {
		return { data };
	} else {
		throw new Error("Data Not found!");
	}
};
