const pool = require('../config/db');

const createMessage = async ({ userId, title, text }) => {
	const result = await pool.query(
		'INSERT INTO membersonly_messages(user_id, title, text) VALUES ($1, $2, $3) RETURNING *',
		[userId, title, text]
	);
	return result.rows[0];
};

const getAllMessages = async () => {
	const result = await pool.query(
		`SELECT m.*, u.first_name, u.last_name 
		 FROM membersonly_messages m 
		 JOIN membersonly_users u ON m.user_id = u.id 
		 ORDER BY m.timestamp DESC`
	);
	return result.rows;
};

const deleteMessage = async (id) => {
	await pool.query('DELETE FROM membersonly_messages WHERE id = $1', [id]);
};

module.exports = {
	createMessage,
	getAllMessages,
	deleteMessage
};
