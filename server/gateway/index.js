const express = require("express"),
	cors = require("cors"),
	proxy = require("express-http-proxy");

// creating express app instance
const app = express();

// adding dependencies
app.use(express.json());
app.use(cors());

// adding main gateway routes
app.use("/user", proxy("http://localhost:8001"));
app.use("/product", proxy("http://localhost:8002"));
app.use("/order", proxy("http://localhost:8003"));
app.use("/admin", proxy("http://localhost:8004"));

// express app starts listening on port 8000
app.listen(8000, () => {
	console.log("Gateway is listening on port 8000.");
});
