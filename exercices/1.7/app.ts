import express, { ErrorRequestHandler, Request, Response, NextFunction } from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import filmsRouter from "./routes/films";

const app = express();

let getRequestCount = 0;

// Middleware pour enregistrer les requêtes GET
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (req.method === "GET") {
    getRequestCount++;
    console.log(`GET counter: ${getRequestCount}`);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);

app.use("/films", filmsRouter);

// Error handler
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  return res.status(500).send("Something broke!");
};

app.use(errorHandler);

export default app;