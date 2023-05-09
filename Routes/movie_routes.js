const express = require("express");

const moviesRouter = express.Router();

const { validationResult } = require("express-validator");
const prisma = require("../database/DBconfig");

const SchemaValidators = require("../validators/validators");

moviesRouter.get("/", async (req, res) => {
  try {
    const movies = await prisma.Movies.findMany({
      include: {
        director: true,
      },
    });
    if (!movies) {
      res.send([{ "No Values": "No movies found" }]);
    } else {
      res.json(movies);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

moviesRouter.post(
  "/",
  [SchemaValidators.checkReqBodyExists, SchemaValidators.moviePostSchema],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsList = errors.array().reduce((acc, err) => {
          acc.push(err.msg);
          return acc;
        }, []);
        res.status(422).json({ Errors: errorsList });
        return;
      }

      const movie = req.body;

      const isMovieRankExists = await prisma.Movies.findUnique({
        where: {
          rank: movie.rank,
        },
      });

      if (isMovieRankExists) {
        res
          .status(422)
          .send({ Error: `Movie with rank ${movie.rank} alredy exists.` });
        return;
      }

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
          actor: movie.actor,
          releaseYear: movie.releaseYear,
          director: {
            connect: { id: director.id },
          },
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
  }
);

moviesRouter.get(
  "/:movieId",
  SchemaValidators.movieIdParamSchema,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsList = errors.array().reduce((acc, err) => {
          acc.push(err.msg);
          return acc;
        }, []);
        res.status(422).json({ Errors: errorsList });
        return;
      }

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
  }
);

moviesRouter.put(
  "/:movieId",
  [
    SchemaValidators.checkReqBodyExists,
    SchemaValidators.movieIdParamSchema,
    SchemaValidators.moviePutSchema,
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsList = errors.array().reduce((acc, err) => {
          acc.push(err.msg);
          return acc;
        }, []);
        res.status(422).json({ Errors: errorsList });
        return;
      }

      const movie = req.body;

      const isMovieNotExists = await prisma.Movies.findUnique({
        where: {
          rank: Number(req.params.movieId),
        },
      });

      if (!isMovieNotExists) {
        res
          .status(422)
          .send({ Error: `Movie with rank ${req.params.movieId} does not exists.` });
        return;
      }

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
          rank: Number(req.params.movieId),
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
  }
);

moviesRouter.delete(
  "/:movieId",
  SchemaValidators.movieIdParamSchema,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsList = errors.array().reduce((acc, err) => {
          acc.push(err.msg);
          return acc;
        }, []);
        res.status(422).json({ Errors: errorsList });
        return;
      }

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
  }
);

module.exports = moviesRouter;
