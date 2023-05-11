const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const prisma = require("../database/DBconfig");
const SchemaValidators = require("../validators/validators");

const userRouter = express.Router();

const { SECRET_KEY } = process.env;

userRouter.post(
  "/signup",
  [SchemaValidators.checkUserBodyFields, SchemaValidators.userSchema],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsList = errors.array().reduce((acc, err) => {
          acc.push(err.msg);
          return acc;
        }, []);
        res.status(422).json({ Error: errorsList });
        return;
      }

      const userDetails = req.body;

      const userExists = await prisma.users.findUnique({
        where: {
          email: userDetails.email,
        },
      });

      if (userExists) {
        res.status(400).json({
          message: `User already exist with ${userDetails.email} email.`,
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(userDetails.password, 10);

      const user = await prisma.users.create({
        data: {
          email: userDetails.email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "24h",
      });

      res.status(201).json({ user, token });
    } catch (err) {
      console.log(err);
      res.status(500).send([{ Error: "Something Went Wrong" }]);
    }
  }
);

userRouter.post(
  "/signin",
  [SchemaValidators.checkUserBodyFields, SchemaValidators.userSchema],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsList = errors.array().reduce((acc, err) => {
          acc.push(err.msg);
          return acc;
        }, []);
        res.status(422).json({ Error: errorsList });
        return;
      }

      const userDetails = req.body;

      const user = await prisma.users.findUnique({
        where: {
          email: userDetails.email,
        },
      });
      if (!user) {
        res
          .status(400)
          .json({ message: `User not found with email ${userDetails.email}` });
        return;
      }

      const matchedPassword = await bcrypt.compare(
        userDetails.password,
        user.password
      );

      if (!matchedPassword) {
        res.status(400).json({ message: "Invalid Credentials" });
        return;
      }

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "24h",
      });
      console.log(token);

      res.status(201).json({ user, token });
    } catch (err) {
      console.log(err);
      res.status(500).send([{ Error: "Something Went Wrong" }]);
    }
  }
);

module.exports = userRouter;
