const Pool = require("pg").Pool;

const dbConfig = new Pool({
  user: "postgres",
  host: "localhost",
  database: "movies-api-rahul",
  password: "8253",
  port: 5432,
});

module.exports = dbConfig;
