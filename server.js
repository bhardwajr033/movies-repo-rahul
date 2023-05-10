const express = require("express");

const moviesRouter = require("./Routes/movie_routes");
const directorRouter = require("./Routes/director_routes");
const logger = require("./Logs/logger");

const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log("Unhandled exception, shutting down");
  process.exit(1);
});

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/movies", moviesRouter);
app.use("/api/directors", directorRouter);

app.use("/*", (req, res) => {
  res.status(404).send({ Error: "request not found" });
});

const server = app.listen(PORT, () => {
  console.log(`Server has started at ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log("Unhandled rejection");

  server.close(() => {
    process.exit(0);
  });
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nSIGINT received. Closing server...");

  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
