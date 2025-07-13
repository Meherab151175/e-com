import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import notFound from "./middleware/notFound";
import categoryRouter from "./module/category/category.route";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Declare the category router
app.use("/api/v1/category", categoryRouter);

app.use(notFound);
export default app;
