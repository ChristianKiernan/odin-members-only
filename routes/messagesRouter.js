const express = require('express');
const messagesController = require('../controllers/messagesController');
const { isAuth, isAdmin } = require('../middleware/auth');

const messagesRouter = express.Router();

messagesRouter.get('/', messagesController.getHomePage);
messagesRouter.post('/message', isAuth, messagesController.createMessage);
messagesRouter.post('/message/:id/delete', isAdmin, messagesController.deleteMessage);

module.exports = messagesRouter;

