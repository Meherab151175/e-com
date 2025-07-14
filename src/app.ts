import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import notFound from "./middleware/notFound";
import categoryRouter from "./module/category/category.route";
import productRouter from "./module/product/product.route";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Declare the category router
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter); // Assuming you have a product router

app.use(notFound);
export default app;
