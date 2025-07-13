import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import notFound from "./middleware/notFound";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(notFound);
export default app;
