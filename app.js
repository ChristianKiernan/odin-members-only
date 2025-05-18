const express = require('express');
const passport = require('passport');
const path = require('node:path');
const { Pool } = require('pg');
require('dotenv').config();
require('./config/passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const messagesRouter = require('./routes/messagesRouter');
const usersRouter = require('./routes/usersRouter');
const flash = require('connect-flash');

const pool = new Pool({
	connectionString: process.env.DB_URL,
});

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
	session({
		store: new pgSession({
			pool: pool,
		}),
		secret: process.env.MEMBER_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 5 },
	})
);
app.use(flash());
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success');
	res.locals.error_msg = req.flash('error');
	next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use('/', messagesRouter);
app.use('/', usersRouter);
app.listen(3000, () => console.log('App listening on localhost:3000'));
