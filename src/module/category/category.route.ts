import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { createCategorySchema } from "./category.validation";
import { createCategory } from "./category.controller";

const categoryRouter = express.Router();

categoryRouter.post(
  "/create-category",
  validateRequest(createCategorySchema),
  createCategory
);

export default categoryRouter;
