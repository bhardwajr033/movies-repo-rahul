const express = require("express");

const directoRouter = express.Router();
const { validationResult } = require("express-validator");
const prisma = require("../database/DBconfig");

const SchemaValidators = require("../validators/validators");

directoRouter.get("/", async (req, res) => {
  try {
    const directors = await prisma.Directors.findMany({});
    if (!directors) {
      res.send(["No Directors found"]);
    } else {
      res.json(directors);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send([{ Error: err.message }]);
  }
});

directoRouter.post(
  "/",
  [SchemaValidators.checkReqBodyExists, SchemaValidators.directorPostSchema],
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

      const data = req.body;
      const director = await prisma.Directors.upsert({
        where: { name: data.name },
        update: {},
        create: { name: data.name },
      });
      res.json(director);
    } catch (err) {
      console.log(err);
      res.status(500).send({ Error: err.message });
    }
  }
);

directoRouter.get(
  "/:directorId",
  SchemaValidators.directorIdParamSchema,
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

      const director = await prisma.Directors.findUnique({
        where: {
          id: Number(req.params.directorId),
        },
      });
      if (!director) {
        res.send({
          "Not Found": `No directors found with directorId of ${req.params.directorId}`,
        });
      } else {
        res.json(director);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send([{ Error: err.message }]);
    }
  }
);

directoRouter.put(
  "/:directorId",
  [
    SchemaValidators.checkReqBodyExists,
    SchemaValidators.directorIdParamSchema,
    SchemaValidators.directorPutSchema,
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

      const directorUpdated = await prisma.Directors.update({
        where: {
          id: Number(req.params.directorId),
        },
        data: {
          name: req.body.name,
        },
      });
      res.json(directorUpdated);
    } catch (err) {
      console.log(err);
      res.status(500).send({ Error: err.message });
    }
  }
);

directoRouter.delete(
  "/:directorId",
  SchemaValidators.directorIdParamSchema,
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

      const directorDeleted = await prisma.Directors.delete({
        where: {
          id: Number(req.params.directorId),
        },
      });

      if (!directorDeleted) {
        res.send({
          "Not Found": `No director found with directorId of ${req.params.directorId}`,
        });
      } else {
        res.json(directorDeleted);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send([{ Error: err.message }]);
    }
  }
);

module.exports = directoRouter;
