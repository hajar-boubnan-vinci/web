import { Request } from "express";

interface Pizza {
  id: number;
  title: string;
  content: string;
}

interface PizzaToUpdate {
  title?: string;
  content?: string;
}

type NewPizza = Omit<Pizza, "id">;

interface Drink {
  id: number;
  title: string;
  image: string;
  volume: number;
  price: number;
}

type NewDrink = Omit<Drink, "id">;

interface AuthenticatedUser {
  username: string;
  token: string;
}

interface User {
  id: number;
  username: string;
  password: string;
}

type PotentialUser = Omit<User, "id">;

interface AuthenticatedRequest extends Request {
  user?: User;
}

interface JwtPayload {
  username: string;
  exp: number; // Expiration time (in seconds since the epoch)
  iat: number; // Issued at time (in seconds since the epoch)
}

// Ajout des interfaces pour les films et les commentaires

interface Movie {
  id: number;
  title: string;
  director: string;
  duration: number;
  description?: string;
}

interface MovieToUpdate {
  title?: string;
  director?: string;
  duration?: number;
  description?: string;
}

type NewMovie = Omit<Movie, "id">;

interface Comment {
  id: number;
  filmId: number;
  userId: number;
  content: string;
}

type NewComment = Omit<Comment, "id">;

export type {
  Pizza,
  NewPizza,
  PizzaToUpdate,
  Drink,
  NewDrink,
  AuthenticatedUser,
  User,
  PotentialUser,
  AuthenticatedRequest,
  JwtPayload,
  Movie,
  NewMovie,
  MovieToUpdate,
  Comment,
  NewComment,
};