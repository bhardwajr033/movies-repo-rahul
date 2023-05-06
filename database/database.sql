CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  release_year INT,
  rating FLOAT,
  director_name VARCHAR REFERENCES directors(name) ON DELETE CASCADE
);

CREATE TABLE directors (
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE
);
