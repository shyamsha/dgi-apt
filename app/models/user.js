const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const { Schema } = mongoose;
const userSchema = new Schema({
	username: {
		type: String,
		minlength: 3,
		maxlength: 32,
		requrired: true
	},
	mobile: {
		type: String,
		maxlength: 15,
		default: "+",
		validate: {
			validator: function(value) {
				return validator.isMobilePhone(value);
			},
			message: function() {
				return "invalid mobile number";
			}
		}
	},
	DOB: {
		type: String,

		requrired: true,
		validate: {
			validator: function(value) {
				// return validator.isBefore("2011-08-06");
				return validator.toDate(value);
			},
			message: function() {
				return "invalid date fromat";
			}
		}
	},
	email: {
		type: String,
		unique: true,
		maxlength: 64,
		validate: {
			validator: function(value) {
				return validator.isEmail(value);
			},
			message: function() {
				return "invalid email fromat";
			}
		},
		requrired: true
	},
	password: {
		type: String,
		minlength: 8,
		maxlength: 32,
		requrired: true,
		validate: {
			validator: function(value) {
				return validator.isInt(value);
			},
			message: function() {
				return "password atleast one number";
			}
		}
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});
//hash password
userSchema.pre("save", function(next) {
	if (this.isNew) {
		bcryptjs.genSalt(10).then(salt => {
			bcryptjs
				.hash(this.password, salt)
				.then(hashpassword => {
					this.password = hashpassword;
					next();
				})
				.catch(err => {
					console.log(err);
				});
		});
	} else {
		next();
	}
});

const User = mongoose.model("User", userSchema);
module.exports = {
	User
};
