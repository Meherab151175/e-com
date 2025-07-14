import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "./product.services";

export const createProductController = catchAsync(
  async (req: Request, res: Response) => {
    const product = await createProduct(req.body, req.file);
    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  }
);
export const getAllProductsController = catchAsync(
  async (req: Request, res: Response) => {
    const products = await getAllProducts(req.query);
    res.status(200).json({
      success: true,
      data: products,
      message: "Products retrieved successfully",
    });
  }
);

export const updateProductController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await updateProduct(id, req.body);
    res.status(200).json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  }
);
