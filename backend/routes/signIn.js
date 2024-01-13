const database = require("../database/databaseFunctions.js");
const express = require("express");
const signInRouter = express.Router();

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
