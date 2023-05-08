const express = require("express");
const director_router = express.Router();
const dbConfig = require("../database/DBconfig");

director_router.get("/", async (req, res) => {
  try {
    const directors = await dbConfig.query("SELECT * FROM directors;");
    if (directors.rows.length === 0) {
      res.send(["No Directors found"]);
    } else {
      res.json(directors.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(600).send([{ Error: err.message }]);
  }
});

director_router.post("/", async (req, res) => {
  try {
    const director = req.body;
    const dbRespose = await dbConfig.query(
      "INSERT INTO directors (director_name) VALUES ($1) RETURNING *;",
      [director.director_name]
    );
    res.json(dbRespose.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: err.message });
  }
});

director_router.get("/:directorId", async (req, res) => {
  try {
    const director = await dbConfig.query(
      `SELECT * FROM directors WHERE id = ${parseInt(req.params.directorId)};`
    );
    if (director.rows.length === 0) {
      res.send([
        `No directors found with directorId of ${req.params.directorId}`,
      ]);
    } else {
      res.json(director.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

director_router.put("/:directorId", async (req, res) => {
  try {
    const updatedDetails = req.body;
    let director = await dbConfig.query(
      `SELECT * FROM directors WHERE id = ${parseInt(req.params.directorId)};`
    );
    director = director.rows[0];
    if (director.length === 0) {
      res.send([
        `No directors found with directorId of ${req.params.directorId}`,
      ]);
      return;
    }
    const dbRespose = await dbConfig.query(
      `UPDATE directors SET director_name = $1 WHERE id = ${parseInt(
        req.params.directorId
      )} RETURNING *;`,
      [updatedDetails.director_name || director.director_name]
    );
    res.json(dbRespose.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

director_router.delete("/:directorId", async (req, res) => {
  try {
    const dbRespose = await dbConfig.query(
      `DELETE FROM directors WHERE id = ${parseInt(
        req.params.directorId
      )} RETURNING *;`
    );
    if (dbRespose.rows.length === 0) {
      res.send([`No director found with directorId of ${req.params.directorId}`]);
    } else {
      res.json(dbRespose.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});


module.exports = director_router;
