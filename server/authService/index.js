const express = require("express");
const app = express();

app.use(express.json());

// basic route and response
app.use("/", (req, res, next) => {
	return res.status(200).json({ msg: "Hello from auth service." });
});

// express app starts listening on port 8004
app.listen(8004, () => {
	console.log("Auth service is listening on port 8004.");
});
