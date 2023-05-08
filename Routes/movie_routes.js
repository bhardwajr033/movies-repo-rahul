const express = require("express");

const moviesRouter = express.Router();
const prisma = require("../database/DBconfig");

moviesRouter.get("/", async (req, res) => {
  try {
    const movies = await prisma.Movies.findMany({
      include: {
        director: true,
      },
    });
    if (!movies) {
      res.send(["No movies found"]);
    } else {
      res.json(movies);
    }
  } catch (err) {
    console.log(err);
    res.status(600).send([{ Error: err.message }]);
  }
});

moviesRouter.post("/", async (req, res) => {
  try {
    const movie = req.body;
    const director = await prisma.Directors.upsert({
      where: { name: movie.director },
      update: {},
      create: { name: movie.director },
    });

    const movieAdded = await prisma.Movies.create({
      data: {
        rank: movie.rank,
        title: movie.title,
        description: movie.description,
        runtime: movie.runtime,
        genre: movie.genre,
        rating: movie.rating,
        metascore: movie.metascore,
        votes: movie.votes,
        grossEarningsInMil: movie.grossEarningsInMil,
        director: {
          connect: { id: director.id },
        },
        releaseYear: movie.releaseYear,
      },
      include: {
        director: true,
      },
    });

    res.json(movieAdded);
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: err.message });
  }
});

moviesRouter.get("/:movieId", async (req, res) => {
  try {
    const movie = await prisma.Movies.findUnique({
      where: {
        rank: Number(req.params.movieId),
      },
      include: {
        director: true,
      },
    });

    if (!movie) {
      res.send([`No movies found with movieid of ${req.params.movieId}`]);
    } else {
      res.json(movie);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

moviesRouter.put("/:movieId", async (req, res) => {
  try {
    const movie = req.body;

    const directorDetail = await prisma.Movies.findUnique({
      where: {
        rank: Number(req.params.movieId),
      },
      include: {
        director: true,
      },
    });
    const directorName = directorDetail.director.name;

    const director = await prisma.Directors.upsert({
      where: { name: movie.director || directorName },
      update: {},
      create: { name: movie.director || directorName },
    });

    const movieUpdated = await prisma.Movies.update({
      where: {
        rank: Number(req.params.movieId),
      },
      data: {
        ...movie,
        director: {
          connect: { id: director.id },
        },
      },
      include: {
        director: true,
      },
    });

    res.json(movieUpdated);
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

moviesRouter.delete("/:movieId", async (req, res) => {
  try {
    const movieDeleted = await prisma.Movies.delete({
      where: {
        rank: Number(req.params.movieId),
      },
    });
    if (!movieDeleted) {
      res.send([`No movies found with movieid of ${req.params.movieId}`]);
    } else {
      res.json(movieDeleted);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

module.exports = moviesRouter;
