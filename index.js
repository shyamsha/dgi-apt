const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("./config/db_connect");
const { userController } = require("./app/controllers/user_controller");

app.use(express.json());
app.use("/users", userController);

app.get("/", (req, res) => {
	res.send("Welcome");
});
app.use(function(req, res) {
	res
		.status(404)
		.send(
			"The resource you are looking for doesn’t exist." + "\n 404 Not Found "
		);
});

app.listen(port, () => {
	console.log("listining from", port);
});
