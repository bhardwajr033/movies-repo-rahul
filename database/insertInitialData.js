const fs = require("fs").promises;
const path = require("path");
const dbConfig = require("./DBconfig");

async function insertInitialData() {
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

  movies.forEach((movie) => {
    dbConfig.query(
      "INSERT INTO directors (director_name) VALUES ($1);",
      [movie.Director],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
  });
  movies.forEach((movie) => {
    dbConfig.query(
      `INSERT INTO movies (rank, title, description, runtime, genre, rating, metascore, votes, gross_earning_in_mil, director_name, actor, release_year,director_id) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11 , $12 ,(SELECT id FROM directors WHERE director_name = $13));`,
      [
        movie.Rank,
        movie.Title,
        movie.Description,
        movie.Runtime,
        movie.Genre,
        movie.Rating,
        movie.Metascore,
        movie.Votes,
        movie.Gross_Earning_in_Mil,
        movie.Director,
        movie.Actor,
        movie.Year,
        movie.Director
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
  });
}

insertInitialData();
