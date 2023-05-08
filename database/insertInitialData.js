const fs = require("fs").promises;
const path = require("path");
const prisma = require("./DBconfig");

async function insertInitialData() {
  const readData = await fs.readFile(
    path.join(__dirname, "../data/movies.json"),
    "utf8"
  );

  const movies = JSON.parse(readData).reduce((acc, movieDetails) => {
    const movie = { ...movieDetails };
    if (movie.Gross_Earning_in_Mil === "NA") {
      movie.Gross_Earning_in_Mil = 0;
    }
    if (movie.Metascore === "NA") {
      movie.Metascore = 0;
    }
    acc.push(movie);
    return acc;
  }, []);
}

insertInitialData();
