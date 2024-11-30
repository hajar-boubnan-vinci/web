import React from "react";
import { Movie } from "../types";
import MovieItem from "./MovieItem";

interface CinemaProps {
  name: string;
  movies: Movie[];
}

const Cinema: React.FC<CinemaProps> = ({ name, movies }) => (
  <div>
    <h2>{name}</h2>
    <ul>
      {movies.map((movie) => (
        <li key={movie.title}>
          <MovieItem
            title={movie.title}
            director={movie.director}
            description={movie.description}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default Cinema;
