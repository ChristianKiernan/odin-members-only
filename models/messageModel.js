const pool = require('../config/db');

const createMessage = async ({ userId, title, text }) => {
	const result = await pool.query(
		'INSERT INTO membersonly_messages(user_id, title, text) VALUES ($1, $2, $3, $4) RETURNING *',
		[userId, title, text]
	);
	return result.rows[0];
};

const getAllMessages = async () => {
	const result = await pool.query(
		'SELECT membersonly_messages.*, membersonly_users.first_name, membersonly_users.last_name FROM membersonly_messages, JOIN membersonly_users ON membersonly_messages.user_id = members_only.usersid ORDER BY membersonly_messages.timestamp DESC'
	);
};

module.exports = {
	createMessage,
};
