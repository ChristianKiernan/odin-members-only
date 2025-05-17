const { Router } = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = Router();

usersRouter.get('/', (req, res) => res.render('index'));
usersRouter.get('/sign-up', usersController.signUpPageGet);
usersRouter.get('/success', (req, res) => res.render('success'));
usersRouter.post('/sign-up', usersController.createUser);
usersRouter.post('/log-in', usersController.logIn);

module.exports = usersRouter;
