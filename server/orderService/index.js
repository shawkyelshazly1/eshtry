const express = require("express");
const app = express();

app.use(express.json());

// basic route and response
app.use("/", (req, res, next) => {
	return res.status(200).json({ msg: "Hello from order service." });
});

// express app starts listening on port 8003
app.listen(8003, () => {
	console.log("Order service is listening on port 8003.");
});
