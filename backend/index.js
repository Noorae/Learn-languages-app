require("dotenv").config();
const express = require("express");
const languagesRouter = require("./routes/languages.js");
const port = 8080;
const app = express();
const pool = require("./database/databaseConnection.js");
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use("/api/languages/english", languagesRouter);
app.use("api/languages/swedish", languagesRouter);
app.use("api/languages/korean", languagesRouter);
