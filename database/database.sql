CREATE TABLE directors(
  id SERIAL PRIMARY KEY,
  director_name TEXT UNIQUE
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  rank INTEGER UNIQUE,
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
  release_year INTEGER,
  director_id INTEGER ,
  FOREIGN KEY (director_id) REFERENCES directors(id) ON DELETE CASCADE
);