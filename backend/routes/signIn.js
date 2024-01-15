const database = require("../database/databaseFunctions.js");
const express = require("express");
const signInRouter = express.Router();
const bcrypt = require("bcrypt");

signInRouter.get("/:myUserName", async (req, res) => {
  try {
    //extract username from the url
    const username = req.params.myUserName;
    console.log(username);
    //extract password from req
    //hash the password
    //check if there are matches in the database
    //TO DO: const user = await database. FUNCTION THAT FINDS CORRECT ID/USER;
    //response with the right data
    //CREATE JWS TOKEN
    res.json(translations);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

signInRouter.post("/signup", async (req, res) => {
  try {
    //TO DO add validation here for the req body
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = {
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    };
    const existingUser = await database.findByUserName(data.username);

    console.log("Existing User:", existingUser);

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

module.exports = signInRouter;
