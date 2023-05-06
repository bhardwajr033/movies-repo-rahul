const fs = require("fs").promises;
const path = require("path");
const dbConfig = require("./DBconfig");

async function insertmovies() {
  const readData = await fs.readFile(
    path.join(__dirname, "../data/movies.json"),
    "utf8"
  );
  const movies = JSON.parse(readData).reduce((acc, movie) => {
    if (movie.Gross_Earning_in_Mil === "NA") {
      movie.Gross_Earning_in_Mil = 0;
    }
    if (movie.Metascore === "NA") {
      movie.Metascore = 0;
    }
    acc.push(movie);
    return acc;
  }, []);
  movies.forEach(async (movie) => {
    const response = await dbConfig.query(
      "INSERT INTO movies (rank, title, description, runtime, genre, rating, metascore, votes, gross_earning_in_mil, director_name, actor, release_year) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12);",
      Object.values(movie)
    );
  });
}

insertmovies();
