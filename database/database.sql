CREATE TABLE movies (
  index SERIAL PRIMARY KEY,
  rank INTEGER,
  title VARCHAR,
  description TEXT,
  runtime INTEGER,
  genre VARCHAR,
  rating FLOAT,
  metascore INTEGER,
  votes INTEGER,
  gross_earning_in_mil FLOAT,
  director_name VARCHAR,
  actor VARCHAR,
  release_year INTEGER
);