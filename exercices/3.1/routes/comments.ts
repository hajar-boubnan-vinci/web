import { Router } from "express";
import { NewComment, AuthenticatedRequest } from "../types";
import { createComment, deleteComment, readAllComments } from "../services/comments";
import { authorize } from "../utils/auths";

const router = Router();

/* Read all comments, optionally filtered by filmId
   GET /comments
   GET /comments?filmId=1
*/
router.get("/", (_req, res) => {
  const filmId = _req.query.filmId ? Number(_req.query.filmId) : undefined;
  const comments = readAllComments(filmId);
  return res.json(comments);
});

// Create a comment
router.post("/", authorize, (req: AuthenticatedRequest, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("filmId" in body) ||
    !("content" in body) ||
    typeof body.filmId !== "number" ||
    typeof body.content !== "string" ||
    !body.content.trim()
  ) {
    return res.sendStatus(400);
  }

  const { filmId, content } = body as NewComment;
  const userId = req.user!.id;

  const addedComment = createComment({ filmId, userId, content });

  return res.json(addedComment);
});

// Delete a comment
router.delete("/:id", authorize, (req: AuthenticatedRequest, res) => {
  const id = Number(req.params.id);
  const userId = req.user!.id;
  const deletedComment = deleteComment(id, userId);
  if (!deletedComment) return res.sendStatus(404);

  return res.json(deletedComment);
});

export default router;