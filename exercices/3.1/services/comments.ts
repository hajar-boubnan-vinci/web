import path from "node:path";
import { Comment, NewComment } from "../types";
import { parse, serialize } from "../utils/json";
import { readMovieById } from "./films";

const jsonDbPath = path.join(__dirname, "/../data/comments.json");

const defaultComments: Comment[] = [];

function readAllComments(filmId?: number): Comment[] {
  const comments = parse(jsonDbPath, defaultComments);
  if (filmId !== undefined) {
    return comments.filter(comment => comment.filmId === filmId);
  }
  return comments;
}

function createComment(newComment: NewComment): Comment | null {
  const comments = parse(jsonDbPath, defaultComments);
  const movie = readMovieById(newComment.filmId);
  if (!movie) {
    return null; // Le film n'existe pas
  }
  const existingComment = comments.find(comment => comment.filmId === newComment.filmId && comment.userId === newComment.userId);
  if (existingComment) {
    return null; // L'utilisateur a déjà commenté ce film
  }
  const lastId = comments.length > 0 ? comments[comments.length - 1].id : 0;
  const comment: Comment = { id: lastId + 1, ...newComment };
  const updatedComments = [...comments, comment];
  serialize(jsonDbPath, updatedComments);
  return comment;
}

function deleteComment(id: number, userId: number): Comment | undefined {
  const comments = parse(jsonDbPath, defaultComments);
  const index = comments.findIndex(comment => comment.id === id && comment.userId === userId);
  if (index === -1) return undefined;

  const deletedElements = comments.splice(index, 1);
  serialize(jsonDbPath, comments);
  return deletedElements[0];
}

export { readAllComments, createComment, deleteComment };