require("dotenv").config({ path: "../.env" });

const database = require("../database/databaseFunctions.js");
const express = require("express");
const signInRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Route handler for user registration.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @property {string} hashedPassword - Hashed user password to be added to database.
 * @property {Object} data - User data to be added to database.
 * @property {<Object>} existingUser - Object containing the existing user information.
 * @returns {Promise<void>} A Promise that resolves when user registration is succesful.
 * @throws {Object} JSON object with an error message if issue occurs during registration.
 */
signInRouter.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = {
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    };
    const existingUser = await database.findByUserName(data.username);

    if (existingUser) {
      return res.status(200).json({ error: "Username already in use" });
    } else {
      await database.saveUserData(data);
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/**
 * Route handler for user login.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @property {Object} existingUser - Object containing existing userdata.
 * @property {boolean} passwordMatch - True if database password matches the login password.
 * @property {Object} user - User data containing the username and their role
 * @property {string} accessToken - Accesstoken that consists username, user role and token for client.
 * @returns {Promise<void>} A Promise that resolves when user login is completed successfully.
 * @throws {Object} JSON object with an error message if an issue occurs during login process.
 */
signInRouter.post("/login", async (req, res) => {
  try {
    const existingUser = await database.findByUserName(req.body.username);

    if (existingUser == null) {
      return res.status(400).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    console.log(`password was match: ${passwordMatch}`);
    if (!passwordMatch) {
      res.send("Unsuccesful login");
    }

    const user = { name: existingUser.username, role: existingUser.role };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
  } catch {
    res.status(500).send();
  }
});

module.exports = signInRouter;
