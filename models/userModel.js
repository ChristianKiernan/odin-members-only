const pool = require('../config/db');

const createUser = async (firstName, lastName, username, password) => {
	const result = await pool.query(
		'INSERT INTO membersonly_users(first_name, last_name, username, password) VALUES($1, $2, $3, $4)',
		[firstName, lastName, username, password]
	);
	return result.rows[0];
};

module.exports = {
	createUser,
};
