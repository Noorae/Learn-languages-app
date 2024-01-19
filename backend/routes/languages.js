const database = require("../database/databaseFunctions.js");
const express = require("express");
const languagesRouter = express.Router();

/**
 * Route handler to get language data for a specific language.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves when language data retrieved successfully.
 * @throws {Object} JSON object with error message if an issue occur.
 */
languagesRouter.get("/:language", async (req, res) => {
  try {
    const language = req.params.language;
    const translations = await database.findAll(language);
    res.json(translations);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/**
 * Route handler to delete word data by ID for a specific language.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves when the deletion is completed successfully.
 * @throws {Object} JSON object with an error message if an issue occurs during the deletion process.
 */
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

/**
 * Route handler to filter data by tag for a specific language.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves when data filter is successful.
 * @throws {Object} JSON object with an error message if an issue occurs during the filtering process.
 */
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

/**
 * Route handler to add a new word pair for a specific language.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves when the new word pair is added successfully.
 * @throws {Object} JSON object with an error message if an issue occurs during the addition process.
 */
languagesRouter.post("/:language", async (req, res) => {
  try {
    const language = req.params.language;
    const data = req.body;
    if (!data.tag) {
      data.tag = null;
    }
    await database.save(data, language);
    res.status(201).json(req.body);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/**
 * Route handler to update data for a specific language with spesific ID.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise that resolves when the data is updated successfully.
 * @throws {Object} JSON object with an error message if an issue occurs during the update process.
 */
languagesRouter.put("/:language/:myId([0-9]+)", async (req, res) => {
  try {
    const id = parseInt(req.params.myId);
    const language = req.params.language;
    const data = req.body;
    if (!data.tag) {
      data.tag = null;
    }
    const response = await database.updateData(id, data, language);
    res.status(201).json(req.body);
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = languagesRouter;
