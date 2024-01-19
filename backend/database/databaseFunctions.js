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
      const sql = `SELECT * from ??`;
      //protect for sql injection
      const values = [table];
      pool.query(sql, values, (err, result) => {
        if (err) {
          reject(new Error("Unexpected error occured"));
        }
        //console.log("Connection ID: " + result[0]["ConnID"]);
        resolve(result);
      });
    });
  },

  //delete by id
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

  //filterbytag
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
