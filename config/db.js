const { Pool } = require('pg');

module.exports = new Pool ({
    connectionString: DB_URL,
});