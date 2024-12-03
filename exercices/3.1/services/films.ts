import path from "node:path";
import { Movie, NewMovie } from "../types";
import { parse, serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    description: "A mind-bending thriller",
  },
  {
    id: 2,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    description: "A journey through space and time",
  },
];

function readAllMovies(): Movie[] {
  return parse(jsonDbPath, defaultMovies);
}

function readMovieById(id: number): Movie | undefined {
  const movies = parse(jsonDbPath, defaultMovies);
  return movies.find((movie) => movie.id === id);
}

function createMovie(newMovie: NewMovie): Movie {
  const movies = parse(jsonDbPath, defaultMovies);
  const lastId = movies[movies.length - 1].id;
  const movie: Movie = { id: lastId + 1, ...newMovie };
  const updatedMovies = [...movies, movie];
  serialize(jsonDbPath, updatedMovies);
  return movie;
}

function deleteMovie(id: number): Movie | undefined {
  const movies = parse(jsonDbPath, defaultMovies);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index === -1) return undefined;

  const deletedElements = movies.splice(index, 1);
  serialize(jsonDbPath, movies);
  return deletedElements[0];
}

function updateMovie(id: number, updatedMovie: Partial<NewMovie>): Movie | undefined {
  const movies = parse(jsonDbPath, defaultMovies);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) return undefined;

  if (updatedMovie.title !== undefined) {
    movie.title = updatedMovie.title;
  }
  if (updatedMovie.director !== undefined) {
    movie.director = updatedMovie.director;
  }
  if (updatedMovie.duration !== undefined) {
    movie.duration = updatedMovie.duration;
  }
  if (updatedMovie.description !== undefined) {
    movie.description = updatedMovie.description;
  }

  serialize(jsonDbPath, movies);
  return movie;
}

export { readAllMovies, readMovieById, createMovie, deleteMovie, updateMovie };