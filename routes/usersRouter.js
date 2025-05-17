const { Router } = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = Router();

usersRouter.get('/', (req, res) => res.render('sign-up'));
usersRouter.post('/', usersController.createUser);

module.exports = usersRouter;
