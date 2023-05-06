const express = require("express");
const director_router = express.Router();
const dbConfig = require("../database/DBconfig");

director_router.get("/", async (req, res) => {
  try {
    const movies = await dbConfig.query("SELECT * FROM movies");
    res.json(movies.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

module.exports = director_router;
