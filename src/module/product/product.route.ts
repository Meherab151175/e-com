import { Router } from "express";
import {
  createProductController,
  getAllProductsController,
  updateProductController,
} from "./product.controller";
import validateRequest from "../../middleware/validateRequest";
import { createProductSchema, updateProductSchema } from "./product.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const productRouter = Router();

productRouter.post(
  "/create-product",
  upload.single("file"),
  (req, res, next) => {
    req.body = JSON.parse(req.body);
    next();
  },
  validateRequest(createProductSchema),
  createProductController
);
productRouter.get("/", getAllProductsController);
productRouter.put(
  "/update-product/:id",
  validateRequest(updateProductSchema),
  updateProductController
);

export default productRouter;
