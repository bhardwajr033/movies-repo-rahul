const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Create a write stream to a JSON file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const logger = morgan("combined", { stream: accessLogStream });

module.exports = logger;
