const { Router } = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = Router();

usersRouter.get('/', (req, res) => res.render('signUp'));
usersRouter.post('/', usersController.createUser);

module.exports = usersRouter;
