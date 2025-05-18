const pool = require('../config/db');

const createUser = async (firstName, lastName, username, hashedPassword, isAdmin) => {
	const result = await pool.query(
		'INSERT INTO membersonly_users(first_name, last_name, username, password) VALUES($1, $2, $3, $4)',
		[firstName, lastName, username, hashedPassword, isAdmin]
	);
	return result.rows[0];
};

const getUserByUsername = async (username) => {
	const result = await pool.query(
		'SELECT * FROM membersonly_users WHERE username = $1',
		[username]
	);
	return result.rows[0];
};

const upgradeToMember = async (userId) => {
	await pool.query(
		'UPDATE membersonly_users SET is_member = true WHERE id = $1',
		[userId]
	);
};

module.exports = {
	createUser,
	getUserByUsername,
	upgradeToMember
};
