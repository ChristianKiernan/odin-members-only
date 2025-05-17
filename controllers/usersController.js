const db = require('../models/userModel');
const passport = require('passport');

const signUpPageGet = async (req, res, next) => {
	res.render('signUp');
};

const logIn = passport.authenticate('local', {
	successRedirect: '/success',
	failureRedirect: '/'
});

const createUser = async (req, res, next) => {
	try {
		await db.createUser(
			req.body.firstName,
			req.body.lastName,
			req.body.username,
			req.body.password
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
