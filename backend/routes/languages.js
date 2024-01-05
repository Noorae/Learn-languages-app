const database = require("../database/databaseFunctions.js");
const express = require("express");
const languagesRouter = express.Router();
// to do: validation

languagesRouter.get("/:language", async (req, res) => {
  try {
    //extract the language from the url
    const language = req.query.language;
    const translations = await database.findAll(language);
    res.json(translations);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = languagesRouter;
