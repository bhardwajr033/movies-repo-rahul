const jwt = require("jsonwebtoken");

require("dotenv").config();

const { SECRET_KEY } = process.env;

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const usertoken = token.split(" ")[1];
      jwt.verify(usertoken, SECRET_KEY);
    } else {
      res.status(401).json({ message: "Unauthorized User" });
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized User" });
  }
};
