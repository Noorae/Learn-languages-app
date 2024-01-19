require("dotenv").config();
const express = require("express");
const languagesRouter = require("./routes/languages.js");
const signInRouter = require("./routes/signIn.js");
const port = 8080;
const app = express();
const pool = require("./database/databaseConnection.js");
const cors = require("cors");

//Middleware to parse requests to JSON
app.use(express.json());

// Servers build files from the spesified directory
app.use(express.static("./frontend/dist"));

//Enable the use of CORS
app.use(cors());

// Language and user routes
app.use("/api/languages/", languagesRouter);
app.use("/api/users/", signInRouter);

app.all("*", (req, res) => {
  res.sendFile("index.html", { root: "./frontend/dist" });
});

/**
 * Express server start.
 * @type {Object}
 * @throws {Error} - Throws error if errors occur server start process.
 */
const server = app
  .listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });

/**
 * Graceful shut down of the server and mysql client.
 * @function
 * @throws {Error} - Throws error if errors occur during shutdown process.
 */
const gracefulShutdown = () => {
  console.log("Starting graceful shutdown...");
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

//Handle termination
process.on("SIGTERM", gracefulShutdown); // Some other app requirest shutdown.
process.on("SIGINT", gracefulShutdown); // ctrl-c
