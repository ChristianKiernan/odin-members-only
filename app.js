/* eslint-disable no-undef */
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');
const pgSession = require('connect-pg-simple')(session);
// const passport = require('passport');
//const LocalStrategy = require('passport-local');
require('dotenv').config();

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
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 5 },
	})
);

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(3000, () => console.log('App listening on localhost:3000'));
