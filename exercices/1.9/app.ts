import express from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import textRouter from "./routes/texts";
import { requestCounterMiddleware } from "./utils/counter";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* Middleware to count the number of GET requests */
let requestCount = 0;
app.use((req, _res, next) => {
  if (req.method === "GET") {
    requestCount++;
    console.log(`GET counter : ${requestCount}`);
  }
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestCounterMiddleware);

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/texts", textRouter);


export default app;
