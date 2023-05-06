const express = require("express");

const movies_router = require("./Routes/movie_routes");
const director_router = require("./Routes/director_routes");
const logs_router = require("./Routes/logs");
const logger = require("./Logs/logger");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/movies", movies_router);
app.use("/api/directors", director_router);
app.use("/api/logs" , logs_router);

app.listen(PORT, () => {
  console.log(`Server has started at ${PORT}`);
});
