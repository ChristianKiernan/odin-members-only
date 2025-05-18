const messageModel = require('../models/messageModel');
const { body, validationResult } = require('express-validator');

const getHomePage = async (req, res, next) => {
	try {
		const messages = await messageModel.getAllMessages();
		res.render('index', { user: req.user, messages });
	} catch (err) {
		next(err);
	}
};

const createMessage = [
	body('title').notEmpty().withMessage('Title is required'),
	body('text').notEmpty().withMessage('Message text is required'),

	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const messages = await messageModel.getAllMessages();
			return res.status(400).render('index', {
				user: req.user,
				messages,
				errors: errors.array(),
			});
		}
		try {
			await messageModel.createMessage({
				userId: req.user.id,
				title: req.body.title,
				text: req.body.text,
			});
			res.redirect('/');
		} catch (err) {
			next(err);
		}
	},
];

const deleteMessage = async (req, res, next) => {
	if (!req.user?.is_admin) return res.status(403).send('Forbidden');
	try {
		await messageModel.deleteMessage(req.params.id);
		res.redirect('/');
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getHomePage,
	createMessage,
	deleteMessage,
};
