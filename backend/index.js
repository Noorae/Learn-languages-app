require("dotenv").config();
const express = require("express");
const languagesRouter = require("./routes/languages.js");
const signInRouter = require("./routes/signIn.js");
const port = 8080;
const app = express();
const pool = require("./database/databaseConnection.js");
const cors = require("cors");

app.use(express.json());

app.use(express.static("./frontend/dist"));

app.use(cors());

app.use("/api/languages/", languagesRouter);
app.use("/api/users/", signInRouter);

const server = app
  .listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });

const gracefulShutdown = () => {
  console.log("Starting graceful shutdown...");
  // Close the server
  if (server) {
    console.log("Server was opened, so we can close it...");
    server.close((err) => {
      if (err) {
        console.error("SERVER: Error closing Express server: ", err);
      } else {
        console.log("SERVER stopped.");
      }

      console.log("MYSQL Starting graceful shutdown....");
      pool.end((err) => {
        if (err) {
          console.error("MYSQL: Error closing MYSQL connection", err);
        } else {
          console.log("MYSQL: Connection closed. ");
        }

        console.log("MYSQL: Shutdown complete.");
        process.exit(1);
      });
    });
  }
};

process.on("SIGTERM", gracefulShutdown); // Some other app requirest shutdown.
process.on("SIGINT", gracefulShutdown); // ctrl-c
