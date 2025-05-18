const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db = require('../models/userModel');
const passport = require('passport');

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

const logIn = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);
		if (!user) {
			req.flash('error', 'Invalid username or password');
			return res.redirect('/');
		}
		req.logIn(user, (err) => {
			if (err) return next(err);
			req.flash('success', 'Successfully logged in!');
			return res.redirect('/');
		});
	})(req, res, next);
};

const logOut = (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
		req.flash('success', 'You have been logged out.');
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
				hashedPassword,
				req.body.is_admin === 'on'
			);

			res.redirect('/');
		} catch (err) {
			return next(err);
		}
	},
];

const becomeMemberGet = (req, res) => {
	res.render('becomeMember', { error: null });
};

const becomeMember = async (req, res, next) => {
	const secretPassword = process.env.MEMBER_SECRET;

	if (req.body.secret === secretPassword) {
		try {
			await db.upgradeToMember(req.user.id);
			req.user.is_member = true;
			req.flash('success', 'You are now a full member!');
			res.redirect('/');
		} catch (err) {
			return next(err);
		}
	} else {
		req.flash('error', 'Incorrect password');
		res.redirect('/become-member');
	}
};

module.exports = {
	signUpPageGet,
	createUser,
	logIn,
	logOut,
	becomeMemberGet,
	becomeMember,
};
