const express = require("express");

const moviesRouter = express.Router();
const dbConfig = require("../database/DBconfig");

moviesRouter.get("/", async (req, res) => {
  try {
    const movies = await dbConfig.query("SELECT * FROM movies;");
    if (movies.rows.length === 0) {
      res.send(["No movies found"]);
    } else {
      res.json(movies.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(600).send([{ Error: err.message }]);
  }
});

moviesRouter.post("/", async (req, res) => {
  try {
    const movie = req.body;
    await dbConfig.query(
      "INSERT INTO directors (director_name) VALUES ($1);",
      [movie.director_name]
    );
    const dbRespose = await dbConfig.query(
      "INSERT INTO movies (rank, title, description, runtime, genre, rating, metascore, votes, gross_earning_in_mil, director_name, actor, release_year , director_id) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12,(SELECT id FROM directors WHERE director_name = $13)) RETURNING *;",
      [
        movie.rank,
        movie.title,
        movie.description,
        movie.runtime,
        movie.genre,
        movie.rating,
        movie.metascore,
        movie.votes,
        movie.gross_earning_in_mil,
        movie.director_name,
        movie.actor,
        movie.release_year,
        movie.director_name
      ]
    );
    res.json(dbRespose.rows);
  } catch (err) {
    console.log(err);
    if (
      err.message ===
      'duplicate key value violates unique constraint "movies_rank_key"'
    ) {
      res.status(600).send({ Error: "Movie with that rank already exists" });
    } else {
      res.status(500).send({ Error: err.message });
    }
  }
});

moviesRouter.get("/:movieId", async (req, res) => {
  try {
    const movie = await dbConfig.query(
      `SELECT * FROM movies WHERE rank = ${parseInt(req.params.movieId,10)};`
    );
    if (movie.rows.length === 0) {
      res.send([`No movies found with movieid of ${req.params.movieId}`]);
    } else {
      res.json(movie.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

moviesRouter.put("/:movieId", async (req, res) => {
  try {
    const updatedDetails = req.body;
    const dbResposeMovie = await dbConfig.query(
      `SELECT * FROM movies WHERE rank = ${parseInt(req.params.movieId,10)};`
    );
    const {rows} = dbResposeMovie;
    const movie = rows[0];
    if (movie.length === 0) {
      res.send([`No movies found with movieid of ${req.params.movieId}`]);
      return;
    }
    const dbRespose = await dbConfig.query(
      `UPDATE movies SET  title = $1, description =  $2, runtime = $3, genre = $4, rating = $5, metascore = $6, votes = $7, gross_earning_in_mil = $8, director_name = $9, actor = $10, release_year = $11  WHERE rank = ${parseInt(
        req.params.movieId,10
      )} RETURNING *;`,
      [
        updatedDetails.title || movie.title,
        updatedDetails.description || movie.description,
        updatedDetails.runtime || movie.runtime,
        updatedDetails.genre || movie.genre,
        updatedDetails.rating || movie.rating,
        updatedDetails.metascore || movie.metascore,
        updatedDetails.votes || movie.votes,
        updatedDetails.gross_earning_in_mil || movie.gross_earning_in_mil,
        updatedDetails.director_name || movie.director_name,
        updatedDetails.actor || movie.actor,
        updatedDetails.release_year || movie.release_year,
      ]
    );
    res.json(dbRespose.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

moviesRouter.delete("/:movieId", async (req, res) => {
  try {
    const dbRespose = await dbConfig.query(
      `DELETE FROM movies WHERE rank = ${parseInt(
        req.params.movieId,10
      )} RETURNING *;`
    );
    if (dbRespose.rows.length === 0) {
      res.send([`No movies found with movieid of ${req.params.movieId}`]);
    } else {
      res.json(dbRespose.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

module.exports = moviesRouter;
