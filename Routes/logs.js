const express = require("express");
const logs_router = express.Router();
const fs = require("fs").promises;
const path = require("path");

logs_router.get("/", async (req, res) => {
  try {
    const logFilePath = path.join(__dirname, "../Logs/access.log");
    const logs = await fs.readFile(logFilePath, "utf-8");
    res.send(logs);
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

module.exports = logs_router;
