const mysql = require("mysql");
const pool = require("./databaseConnection.js");

module.exports = {
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

  //find all entries in a correct language table
  findAll: (language) => {
    return new Promise((resolve, reject) => {
      //table name is based on the language
      const table = `${language}_words`;
      const sql = `SELECT CONNECTION_ID() AS ConnID, * from ??`;
      //protect for sql injection
      const values = [table];
      pool.query(sql, values, (err, result) => {
        if (err) {
          reject(new Error("Unexpected error occured"));
        }
        console.log("Connection ID: " + result[0]["ConnID"]);
        resolve(result);
      });
    });
  },
};
