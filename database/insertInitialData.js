const fs = require("fs").promises;
const path = require("path");
const prisma = require("./DBconfig");

async function insertInitialData() {
  const readData = await fs.readFile(
    path.join(__dirname, "../data/movies.json"),
    "utf8"
  );
  const movies = JSON.parse(readData).map((movieDetails) => {
    const movie = { ...movieDetails };
    if (movie.Gross_Earning_in_Mil === "NA") {
      movie.Gross_Earning_in_Mil = 0;
    }
    if (movie.Metascore === "NA") {
      movie.Metascore = 0;
    }
    return movie;
  });

  movies.map(async (movie) => {
    const director = await prisma.Directors.upsert({
      where: { name: movie.Director },
      update: {},
      create: { name: movie.Director },
    });

    await prisma.Movies.create({
      data: {
        rank: movie.Rank,
        title: movie.Title,
        description: movie.Description,
        runtime: movie.Runtime,
        genre: movie.Genre,
        rating: movie.Rating,
        metascore: movie.Metascore,
        votes: movie.Votes,
        grossEarningsInMil: movie.Gross_Earning_in_Mil,
        director: {
          connect: { id: director.id },
        },
        releaseYear: movie.Year,
      },
    });
  });
}

insertInitialData()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
