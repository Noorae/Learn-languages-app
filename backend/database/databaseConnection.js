const mysql = require("mysql");
require("dotenv").config({ path: "../.env" });

/**
 * Create connection with .env file credentials
 *
 * @function
 * @property {number} connectionLimit - The pool connection limit in numbers.
 * @property {string} host - The host of the database.
 * @property {string} user - The username for connecting to the database.
 * @property {string} password - Password for connecting to the database.
 * @property {string} database - The name of the database.
 *
 */
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = pool;
