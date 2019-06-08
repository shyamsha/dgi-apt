const mongoose = require("mongoose");
const path = "mongodb://localhost:27017/dgiapt";

mongoose.Promise = global.Promise;
mongoose
	.connect(path, {
		useNewUrlParser: true
	})
	.then(() => {
		console.log("db connected succefully");
	})
	.catch(err => {
		console.log("Error connecting to DB", err);
	});
module.exports = {
	mongoose
};
