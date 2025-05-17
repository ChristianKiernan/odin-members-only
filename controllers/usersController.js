const db = require('../models/userModel');
const passport = require('passport');
const bcrypt = require("bcryptjs");

const signUpPageGet = async (req, res, next) => {
	res.render('signUp');
};

const logIn = passport.authenticate('local', {
	successRedirect: '/success',
	failureRedirect: '/'
});

const createUser = async (req, res, next) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	try {
		await db.createUser(
			req.body.firstName,
			req.body.lastName,
			req.body.username,
			hashedPassword
		);

		res.redirect('/');
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	signUpPageGet,
	createUser,
	logIn,
};
