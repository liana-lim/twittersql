-- Car
#Find all movie-names that have the word "Car" as the first word in the name


SELECT name
FROM movies
WHERE name LIKE 'Car %';

-- Birth year
##  Find all movies made in the year you were born


SELECT *
FROM movies
WHERE year = 1991;

-- 1982 
## How many movies does our dataset have for the year 1982?


SELECT COUNT(*) num85movies
FROM movies
WHERE year = 1982;

-- Stackersons
##Find actors who have "stack" in their last name


SELECT first_name, last_name
FROM actors
WHERE last_name LIKE '%stack%';

-- Popular names
## What are the 10 most popular first names and last names in the business? And how many actors have each given first or last name? This can be multiple queries.


SELECT first_name, COUNT(*) AS name_count
FROM actors
GROUP BY first_name
ORDER BY name_count DESC
LIMIT 10; 


SELECT last_name, COUNT(*) AS amount
FROM actors
GROUP BY last_name
ORDER BY amount DESC
LIMIT 10;

--- Prolific 
##List the top 100 most active actors and the number of movies they have starred in


## w/ WHERE
SELECT first_name, last_name, COUNT(*) AS num_roles 
FROM actors, roles, movies 
WHERE actors.id = roles.actor_id
AND roles.movie_id = movies.id 
GROUP BY actors.id
ORDER BY num_roles DESC
LIMIT 100;  


## w/ JOIN 

SELECT first_name, last_name, COUNT(*) AS num_roles
FROM actors 
INNER JOIN roles 
  ON actors.id = roles.actor_id
INNER JOIN movies
  ON roles.movie_id = movies.id 
GROUP BY actors.id 
ORDER BY num_roles DESC
LIMIT 100; 


--- Bottom of the barrel 
##How many movies does IMDB have of each genre, ordered by least popular genre?


## just using movie_genres table 

SELECT genre, COUNT(*) AS num_movies_by_genres
FROM movies_genres
GROUP BY genre
ORDER BY num_movies_by_genres ASC;

## inner joining movies table 
SELECT genre, COUNT(*) AS num_movies_by_genres
FROM movies_genres
INNER JOIN movies
  ON movies_genres.movie_id = movies.id
GROUP BY genre
ORDER BY num_movies_by_genres ASC;

## find all movies_genres documents that point 
## to a movie id that does not uniquely identify 
## a document in the movies table 

SELECT *
FROM movies_genres
LEFT OUTER JOIN movies 
ON movies_genres.movie_id = movies.id
WHERE movies.id IS null 

## checking the (non)existence of a movie 
## record that has an id returned from the 
## query right above this one
SELECT * 
FROM movies
WHERE movies.id = 358660;


--- BRAVEHEART
## List the first and last names of all the actors 
## who played in the 1995 movie 'Braveheart',
## arranged alphabetically by last name

SELECT first_name, last_name
FROM actors
INNER JOIN roles
  ON actors.id = roles.actor_id
INNER JOIN movies
  ON roles.movie_id = movies.id 
WHERE movies.name = 'Braveheart' AND movies.year = 1995
ORDER BY last_name; 



--- LEAP NOIR 
##List all the directors who directed a 'Film-Noir' movie in a leap year (you need to check that the genre is 'Film-Noir' and may, for the sake of this challenge, pretend that all years divisible by 4 are leap years). Your query should return director name, the movie name, and the year, sorted by movie name.


## movies_genres, directors, movies_directors, movies
## d -> md -> m -> mg

## Leap w/ INNER JOIN
SELECT 
  directors.first_name, 
  directors.last_name, 
  movies.name, 
  movies.year
FROM directors
INNER JOIN movies_directors
  ON directors.id = movies_directors.director_id 
INNER JOIN movies
  ON movies_directors.movie_id = movies.id 
INNER JOIN movies_genres
  ON movies_genres.movie_id = movies.id 
WHERE movies_genres.genre = 'Film-Noir'
AND movies.year % 4 = 0
ORDER BY movies.name;


## Leap w/ WHERE

SELECT 
  directors.first_name, 
  directors.last_name, 
  movies.name, 
  movies.year
FROM directors, movies_directors, movies, movies_genres
WHERE directors.id = movies_directors.director_id 
AND movies_directors.movie_id = movies.id 
AND  movies_genres.movie_id = movies.id 
AND movies_genres.genre = 'Film-Noir'
AND movies.year % 4 = 0
ORDER BY movies.name;




--- BACON 
##List all the actors that have worked with Kevin Bacon in Drama movies (include the movie name)


SELECT m.name, costars.first_name, costars.last_name
FROM actors bacon, roles r, movies m, movies_genres mg, roles costar_roles, actors costars
WHERE bacon.first_name = 'Kevin' AND bacon.last_name = 'Bacon'
AND bacon.id = r.actor_id
AND r.movie_id = m.id
AND m.id = mg.movie_id 
AND mg.genre = 'Drama'
AND m.id = costar_roles.movie_id 
AND costar_roles.actor_id = costars.id 
AND costars.id != bacon.id
ORDER BY m.name; 


--- IMMORTALS 
## Which actors have acted in a film before 1900 and also in a film after 2000?


SELECT actors.first_name, actors.last_name
FROM actors
INNER JOIN roles
  ON actors.id = roles.actor_id 
INNER JOIN movies
  ON roles.movie_id = movies.id 
WHERE movies.year < 1900 
INTERSECT 
SELECT actors.first_name, actors.last_name
FROM actors
INNER JOIN roles
  ON actors.id = roles.actor_id 
INNER JOIN movies
  ON roles.movie_id = movies.id 
WHERE movies.year > 2000 


--- BUSY FILMING 
## Find actors that played five or more roles in the same movie after the year 1990. Notice that ROLES may have occasional duplicates, but we are not interested in these: we want actors that had five or more distinct roles in the same movie. Write a query that returns the actors' names, the movie name, and the number of distinct roles that they played in that movie (which will be ≥ 5).


SELECT actors.first_name, actors.last_name, movies.name, COUNT (roles.role) AS num_roles
FROM actors 
INNER JOIN roles
  ON actors.id = roles.actor_id 
INNER JOIN movies
  ON roles.movie_id = movies.id 
WHERE movies.year > 1990
GROUP BY roles.actor_id, roles.movie_id 
HAVING num_roles > 4;

--- FEMALE ACTORS ONLY
##For each year, count the number of movies in that year that had only female actors. 
## For movies where no one was casted, you can decide whether to consider them female-only.


SELECT m.year, COUNT(*) femaleOnly
FROM movies m
WHERE not exists
(SELECT * 
FROM roles r, actors a
WHERE a.id = r.actor_id 
AND r.movie_id = m.id 
AND a.gender = 'M')
GROUP BY m.year;  


SELECT year, COUNT(*)
FROM movies
WHERE id NOT IN (
  SELECT movie_id
  FROM roles r, actors a
  WHERE gender = 'M'
  AND a.id = actor_id
)







