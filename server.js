const express = require("express");

const dotenv = require("dotenv");

const logger = require("./middlewares/logger");
const { auth } = require("./middlewares/auth");

const moviesRouter = require("./Routes/movie_routes");
const directorRouter = require("./Routes/director_routes");
const userRouter = require("./Routes/user_routes");

dotenv.config();

const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log("Unhandled exception, shutting down");
  process.exit(1);
});

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api", userRouter);
app.use("/api/movies", auth, moviesRouter);
app.use("/api/directors", auth, directorRouter);

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
