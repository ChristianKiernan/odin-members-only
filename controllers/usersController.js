const db = require('../models/userModel');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const validateInput = [
	body('username').custom(async (value) => {
		const user = await db.getUserByUsername(value);
		if (user) {
			throw new Error('Username already in use');
		}
	}),
	body('password').isLength({ min: 5 }),
	body('confirm_password').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Passwords do not match');
		}
		return true;
	}),
];

const signUpPageGet = async (req, res, next) => {
	res.render('signUp');
};

const logIn = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/',
});

const logOut = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
};

const createUser = [
	validateInput,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('signUp', {
				errors: errors.array(),
			});
		}
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
	},
];

module.exports = {
	signUpPageGet,
	createUser,
	logIn,
	logOut,
};
