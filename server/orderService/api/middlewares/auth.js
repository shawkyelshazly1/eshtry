const { validateAccessToken } = require("../../utils");

module.exports = async (req, res, next) => {
	try {
		const isAuthenticated = await validateAccessToken(req);
		if (isAuthenticated) {
			return next();
		}
	} catch (error) {
		return res.status(403).json({ msg: "Not Authorized!" });
	}
	return res.status(403).json({ msg: "Not Authorized!" });
};
