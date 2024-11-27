import React, { useState } from 'react';
import { Movie } from '../types';
import './MovieItem.css';

const MovieItem: React.FC<Movie> = ({ title, director, description }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div onClick={toggleDescription} className="movie-item">
      <h3>{title}</h3>
      <p>Director: {director}</p>
      {showDescription && <p>Description: {description}</p>}
    </div>
  );
};

export default MovieItem;