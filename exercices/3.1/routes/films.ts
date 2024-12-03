import { Router } from "express";
import { NewMovie, MovieToUpdate } from "../types";
import {
  createMovie,
  deleteMovie,
  readAllMovies,
  readMovieById,
  updateMovie,
} from "../services/films";
import { authorize } from "../utils/auths";

const router = Router();

/* Read all the movies
   GET /films
*/
router.get("/", (_req, res) => { // Marquer _req comme intentionnellement inutilisée
  const movies = readAllMovies();
  return res.json(movies);
});

// Read the movie identified by an id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = readMovieById(id);
  if (!movie) return res.sendStatus(404);
  return res.json(movie);
});

// Create a movie
router.post("/", authorize, (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim()
  ) {
    return res.sendStatus(400);
  }

  const { title, director, duration, description } = body as NewMovie;

  const addedMovie = createMovie({ title, director, duration, description });

  return res.json(addedMovie);
});

// Delete a movie
router.delete("/:id", authorize, (req, res) => {
  const id = Number(req.params.id);
  const deletedMovie = deleteMovie(id);
  if (!deletedMovie) return res.sendStatus(404);

  return res.json(deletedMovie);
});

// Update a movie
router.patch("/:id", authorize, (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body &&
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body && typeof body.duration !== "number")
  ) {
    return res.sendStatus(400);
  }

  const movieToUpdate: MovieToUpdate = body;

  const id = Number(req.params.id);
  const updatedMovie = updateMovie(id, movieToUpdate);
  if (!updatedMovie) return res.sendStatus(404);

  return res.json(updatedMovie);
});

export default router;