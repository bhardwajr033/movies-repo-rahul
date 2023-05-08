const express = require("express");

const moviesRouter = require("./Routes/movie_routes");
const directorRouter = require("./Routes/director_routes");
const logsRouter = require("./Routes/logs");
const logger = require("./Logs/logger");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/movies", moviesRouter);
app.use("/api/directors", directorRouter);
app.use("/api/logs" , logsRouter);

app.use("/*" ,(req,res)=>{
    res.status(404).send({Error : "request not found"})
} )

app.listen(PORT, () => {
  console.log(`Server has started at ${PORT}`);
});
