const express = require("express");

const directoRouter = express.Router();
const prisma = require("../database/DBconfig");

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
    res.status(600).send([{ Error: err.message }]);
  }
});

directoRouter.post("/", async (req, res) => {
  try {
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
});

directoRouter.get("/:directorId", async (req, res) => {
  try {
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
});

directoRouter.put("/:directorId", async (req, res) => {
  try {
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
});

directoRouter.delete("/:directorId", async (req, res) => {
  try {
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
});

module.exports = directoRouter;
