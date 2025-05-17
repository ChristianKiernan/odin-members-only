const { Router } = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = Router();

usersRouter.get('/', (req, res) => res.render('index', { user: req.user }));
usersRouter.get('/sign-up', usersController.signUpPageGet);
usersRouter.get('/log-out', usersController.logOut);
usersRouter.post('/sign-up', usersController.createUser);
usersRouter.post('/log-in', usersController.logIn);


module.exports = usersRouter;
