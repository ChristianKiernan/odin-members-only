const express = require('express');
const messagesController = require('../controllers/messagesController');
const messagesRouter = express.Router();

const isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).json({
			msg: 'You are not authorized to view this resource',
		});
	}
};

messagesRouter.get('/', messagesController.getHomePage);
messagesRouter.post('/message', isAuth, messagesController.createMessage);

module.exports = messagesRouter;
