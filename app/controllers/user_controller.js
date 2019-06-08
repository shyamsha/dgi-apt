const express = require("express");
const router = express.Router();
var ageCalculator = require("age-calculator");
let { AgeFromDateString, AgeFromDate } = require("age-calculator");
const { User } = require("../models/user");

router.post("/register", (req, res) => {
	const user = new User(req.body);
	const dob = req.body.DOB;
	let age = new AgeFromDateString(dob).age;

	if (age > 13) {
		user
			.save()
			.then(user => {
				res.send(user);
			})
			.catch(err => {
				res.send(err);
			});
	} else {
		res.send("age must be > 13");
	}
});

module.exports = {
	userController: router
};
