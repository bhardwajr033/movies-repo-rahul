const {Pool} = require("pg");

const dbConfig = new Pool({
  user: "postgres",
  host: "localhost",
  database: "movies-api-rahul",
  password: "postgres",
  port: 5432,
});

module.exports = dbConfig;
