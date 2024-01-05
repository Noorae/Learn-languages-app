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
};
