const { body, checkSchema, param } = require("express-validator");

exports.checkReqBodyExists = [
  body().custom((value, { req }) => {
    if (JSON.stringify(req.body) === "{}") {
      throw new Error("Request body is missing , should be a application/json");
    }
    return true;
  }),
];

// Movies Validators

exports.movieIdParamSchema = param("movieId")
  .notEmpty()
  .isInt()
  .withMessage("MovieID(rank) parameter must be an integer");

exports.moviePostSchema = checkSchema({
  rank: {
    notEmpty: {
      errorMessage: "rank field is required ",
    },
    isInt: {
      errorMessage: "rank must be an integer",
    },
  },
  title: {
    notEmpty: {
      errorMessage: "title field is required",
    },
    isString: {
      errorMessage: "title must be a string",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "description field is required",
    },
    isString: {
      errorMessage: "description must be a string",
    },
  },
  runtime: {
    notEmpty: {
      errorMessage: "runtime field is required",
    },
    isInt: {
      errorMessage: "runtime must be an integer",
    },
  },
  genre: {
    notEmpty: {
      errorMessage: "genre field is required",
    },
    isString: {
      errorMessage: "genre must be a string",
    },
  },
  rating: {
    notEmpty: {
      errorMessage: "rating field is required",
    },
    isFloat: {
      errorMessage: "rating must be a float",
    },
  },
  metascore: {
    notEmpty: {
      errorMessage: "metascore field is required",
    },
    isInt: {
      errorMessage: "metascore must be an integer",
    },
  },
  votes: {
    notEmpty: {
      errorMessage: "votes field is required",
    },
    isInt: {
      errorMessage: "votes must be an integer",
    },
  },
  grossEarningsInMil: {
    notEmpty: {
      errorMessage: "grossEarningsInMil field is required",
    },
    isFloat: {
      errorMessage: "grossEarningsInMil must be a float",
    },
  },
  actor: {
    notEmpty: {
      errorMessage: "actor field is required",
    },
    isString: {
      errorMessage: "actor must be an string",
    },
  },
  releaseYear: {
    notEmpty: {
      errorMessage: "releaseYear field is required",
    },
    isInt: {
      errorMessage: "releaseYear must be an integer",
    },
  },
  director: {
    notEmpty: {
      errorMessage: "director field is required",
    },
    isString: {
      errorMessage: "director must be a string",
    },
  },
});

exports.moviePutSchema = checkSchema({
  title: {
    optional: true,
    isString: {
      errorMessage: "title must be a string",
    },
  },
  description: {
    optional: true,
    isString: {
      errorMessage: "description must be a string",
    },
  },
  runtime: {
    optional: true,
    isInt: {
      errorMessage: "runtime must be an integer",
    },
  },
  genre: {
    optional: true,
    isString: {
      errorMessage: "genre must be a string",
    },
  },
  rating: {
    optional: true,
    notEmpty: {
      errorMessage: "rating field is required",
    },
    isFloat: {
      errorMessage: "rating must be a float",
    },
  },
  metascore: {
    optional: true,
    isInt: {
      errorMessage: "metascore must be an integer",
    },
  },
  votes: {
    optional: true,
    isInt: {
      errorMessage: "votes must be an integer",
    },
  },
  grossEarningsInMil: {
    optional: true,
    isFloat: {
      errorMessage: "grossEarningsInMil must be a float",
    },
  },
  actor: {
    optional: true,
    isString: {
      errorMessage: "actor must be an integer",
    },
  },
  releaseYear: {
    optional: true,
    isInt: {
      errorMessage: "releaseYear must be an integer",
    },
  },
  director: {
    optional: true,
    isString: {
      errorMessage: "director must be a string",
    },
  },
});

// Directors Validators

exports.directorIdParamSchema = param("directorId")
  .notEmpty()
  .isInt()
  .withMessage("directorId parameter must be an integer");

exports.directorPostSchema = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "name (director name) field is required",
    },
    isString: {
      errorMessage: "name (director name) must be a string",
    },
  },
});

exports.directorPutSchema = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "name (director name) field is required",
    },
    isString: {
      errorMessage: "name (director name) must be a string",
    },
  },
});
