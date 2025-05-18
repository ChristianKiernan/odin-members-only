const { Router } = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = Router();
const { isAuth } = require('../middleware/auth');

usersRouter.get('/', (req, res) => res.render('index', { user: req.user }));
usersRouter.get('/sign-up', usersController.signUpPageGet);
usersRouter.get('/log-out', usersController.logOut);
usersRouter.get('/become-member', isAuth, usersController.becomeMemberGet);
usersRouter.post('/become-member', isAuth, usersController.becomeMember);
usersRouter.post('/sign-up', usersController.createUser);
usersRouter.post('/log-in', usersController.logIn);

module.exports = usersRouter;
