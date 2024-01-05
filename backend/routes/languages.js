const database = require("../database/databaseFunctions.js");
const express = require("express");
const languagesRouter = express.Router();
// to do: validation

languagesRouter.get("/", async (req, res) => {
  try {
    const translations = await database.findAll();
    res.json(translations);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
