const database = require("../database/databaseFunctions.js");
const express = require("express");
const languagesRouter = express.Router();
// to do: validation

languagesRouter.get("/:language", async (req, res) => {
  try {
    //extract the language from the url
    const language = req.params.language;
    console.log(language);
    const translations = await database.findAll(language);
    res.json(translations);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//delete value by id
languagesRouter.delete("/:language/:myId([0-9]+)", async (req, res) => {
  try {
    const id = parseInt(req.params.myId);
    const language = req.params.language;
    await database.deleteById(id, language);
    res.status(200).json({ message: "Deletion completed." }).end();
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
});

//filter by longitude, latitude
languagesRouter.get("/:language/:tag", async (req, res) => {
  try {
    const language = req.params.language;
    const tag = req.params.tag;
    const filteredData = await database.filterByValues(tag, language);
    res.json(filteredData);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
});

//add new word pair
languagesRouter.post("/:language", async (req, res) => {
  try {
    //TO DO add validation here for the req body
    const language = req.params.language;
    console.log(language);
    console.log(req.body);
    const data = req.body;
    if (!data.tag) {
      data.tag = "NULL";
    }
    console.log(data.tag);
    await database.save(data, language);
    res.status(201).json(req.body);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = languagesRouter;
