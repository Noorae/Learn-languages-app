const mysql = require("mysql");
const pool = require("./databaseConnection.js");

module.exports = {
  /**
   * Make a connection to the database.
   * @function
   * @returns {Promise<void>} A Promise which resolves when the connection is successful.
   * @throws {Error} Throws error if there is an issue connecting to the database.
   */
  connect: () => {
    return new Promise((resolve, reject) => {
      console.log("Starting connection...");
      pool.connect((err) => {
        if (err) {
          console.error("Error connecting to the database:", err);
          reject(new Error("Unexpected error occured"));
        } else {
          console.log("Connected to the database");
          resolve();
        }
      });
    });
  },

  /**
   * End connection to database.
   * @function
   * @returns {Promise<void>} A Promise which resolves when the connection is closed.
   * @throws {Error} Throws error if there is an issue shutting down the connection to database.
   */
  close: () => {
    return new Promise((resolve, reject) => {
      pool.end((err) => {
        if (err) {
          reject(new Error("Unexpected error occured"));
        } else {
          resolve("Connection closed");
        }
      });
    });
  },

  /**
   * Finds all entries in a correct language table.
   * @function
   * @param {string} language - The language to search entries for.
   * @property {string} table - The name of database table to get data from.
   * @property {string} sql - The parameterized SQL query.
   * @property {array} values - parameters to be used to complete the SQL query.
   * @returns {Promise<Array<Object>>} A Promise that resolves with entries in an array.
   * @throws {Error} Throws an error if there is an issue while getting data from database.
   */
  findAll: (language) => {
    return new Promise((resolve, reject) => {
      const table = `${language}_words`;
      const sql = `SELECT * from ??`;
      const values = [table];
      pool.query(sql, values, (err, result) => {
        if (err) {
          reject(new Error("Unexpected error occured"));
        }
        resolve(result);
      });
    });
  },

  /**
   * Delete language data by the correct id.
   * @function
   * @param {string} language - The language to search entries for.
   * @param {number} id - The id of data entry to be deleted.
   * @property {string} table - The name of database table to delete data from.
   * @property {string} sql - The parameterized SQL query.
   * @property {array} values - parameters to be used to complete the SQL query.
   * @returns {Promise<Array<Object>>} A Promise that resolves with array containinf deletion data.
   * @throws {Error} Throws an error if there is an issue while deleting data from database.
   */
  deleteById: (id, language) => {
    return new Promise((resolve, reject) => {
      const table = `${language}_words`;
      const sql = `DELETE FROM ?? WHERE id = ?`;
      const values = [table, id];

      pool.query(sql, values, (err, result) => {
        if (err) {
          reject(new Error("Unexpected error occured."));
        } else {
          if (result.affectedRows === 0) {
            reject(new Error("Could not delete resource with id = " + id));
          } else {
            console.log("Deletion succesful");
            resolve(result);
          }
        }
      });
    });
  },

  /**
   * Filters data from database based on a tag.
   * @function
   * @param {string} language - The language to search entries for.
   * @param {string} tag - The tag to filter data with from database.
   * @property {string} table - The name of database table to get data from.
   * @property {string} sql - The parameterized SQL query.
   * @property {array} values - parameters to be used to complete the SQL query.
   * @returns {Promise<Array<Object>>} A Promise that resolves with array containing resulted data in an array.
   * @throws {Error} Throws an error if there is an issue while filtering data from database.
   */
  filterByValues: (tag, language) => {
    return new Promise((resolve, reject) => {
      const table = `${language}_words`;
      const sql = `SELECT * FROM ?? WHERE tag = ?`;
      const values = [table, tag];
      pool.query(sql, values, (err, result) => {
        if (err) {
          reject(new Error("Unexpteced error occured"));
        } else {
          if (result.length === 0) {
            resolve("Nothing found");
          } else {
            resolve(result);
          }
        }
      });
    });
  },

  /**
   * Save new language data to database.
   * @function
   * @param {string} language - The language to save new data for.
   * @param {Object} data - The data to be saved in database.
   * @param {string} data.foreign_language - Word in the spesified language
   * @param {string} data.fi - Word translation in finnish
   * @param {string} data.tag - Tag of the language data.
   * @property {string} table - The name of database table to get data from.
   * @property {string} sql - The parameterized SQL query.
   * @property {array} values - parameters to be used to complete the SQL query.
   * @returns {Promise<Array<Object>>} A Promise that resolves with array containing resulted data in an array.
   * @throws {Error} Throws an error if there is an issue while saving data to database.
   */
  save: (data, language) => {
    return new Promise((resolve, reject) => {
      const table = `${language}_words`;
      const sql = `INSERT INTO ?? (foreign_language, fi, tag) VALUES (?, ?, ?)`;
      const values = [table, data.foreign_language, data.fi, data.tag];

      pool.query(sql, values, (err, result) => {
        if (err) {
          reject(new Error("Error while saving"));
        } else {
          resolve(result);
        }
      });
    });
  },

  /**
   * Save new user data to database.
   * @function
   * @param {Object} data - The user data to be saved in database.
   * @param {string} data.username - Name of the user to be added to database.
   * @param {string} data.password - Hashed password of the user to be added to database.
   * @param {string} data.role - Role fo the user to be added to database.
   * @property {string} table - The name of database table to save data to.
   * @property {string} sql - The parameterized SQL query.
   * @property {array} values - parameters to be used to complete the SQL query.
   * @returns {Promise<Array<Object>>} A Promise that resolves with array containing resulted data in an array.
   * @throws {Error} Throws an error if there is an issue while saving data to database.
   */
  saveUserData: (data) => {
    return new Promise((resolve, reject) => {
      const table = `learning_app_users`;
      const sql = `INSERT INTO ?? (username, password, role) VALUES (?, ?, ?)`;
      const values = [table, data.username, data.password, data.role];

      pool.query(sql, values, (err, result) => {
        if (err) {
          reject(new Error("Error while saving"));
        } else {
          resolve(result);
        }
      });
    });
  },

  /**
   * Fidn users from the database by name.
   * @function
   * @param {string} username - The name of user to be searched from database.
   * @property {string} table - The name of database table to search user from.
   * @property {string} sql - The parameterized SQL query.
   * @property {array} values - parameters to be used to complete the SQL query.
   * @returns {Promise<?Object>} A Promise that resolves with user data if match was found and null if match was not found.
   * @throws {Error} Throws an error if there is an issue while searching data from database.
   */
  findByUserName: (username) => {
    return new Promise((resolve, reject) => {
      const table = `learning_app_users`;
      const sql = `SELECT * FROM  ?? WHERE username=?`;
      const values = [table, username];

      pool.query(sql, values, (err, result) => {
        if (err) {
          reject(new Error("Error while quering data"));
        } else {
          if (result.length > 0) {
            console.log("Result came back with a matching name");
            const [match] = result;
            console.log(match);
            resolve(match);
          } else {
            console.log("No matches in the result");
            console.log(result);
            resolve(null);
          }
        }
      });
    });
  },
  /**
   * Update existing language data to database.
   * @function
   * @param {number} id - Id of the language data to be updated
   * @param {Object} data - Data that is to be replaced in the database.
   * @param {string} data.foreign_language - Word data to be updated.
   * @param {string} data.fi - Word Translation in finnish to be updated.
   * @param {string} data.tag - Word data tag to be updated to to database.
   * @param {string} language - The language in which the data is to be replaced.
   * @property {string} table - The name of database table to update data to.
   * @property {string} sql - The parameterized SQL query.
   * @property {array} values - parameters to be used to complete the SQL query.
   * @returns {Promise<Object>} A Promise that resolves with result of the update to database.
   * @throws {Error} Throws an error if there is an issue while updating data to database.
   */
  updateData: (id, data, language) => {
    return new Promise((resolve, reject) => {
      const table = `${language}_words`;
      const sql = `UPDATE ?? SET foreign_language = ?, fi = ?, tag = ? WHERE id =?`;
      const values = [
        table,
        data.foreign_language,
        data.fi,
        data.tag || "",
        id,
      ];

      pool.query(sql, values, (err, result) => {
        if (err) {
          reject(new Error("Error while saving"));
        } else {
          resolve(result);
        }
      });
    });
  },
};
