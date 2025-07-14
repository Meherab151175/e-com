import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be non-negative"),
  discount: z.number().min(0).max(100).optional(),
  image: z.string().optional(),
  status: z.enum(["In Stock", "Stock Out"]).default("In Stock"),
  category: z.string().min(1, "Category ID is required"),
});

export const updateProductSchema = z.object({
  name: z.string().trim().min(1).optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  discount: z.number().min(0).max(100).optional(),
  image: z.string().optional(),
  status: z.enum(["In Stock", "Stock Out"]).default("In Stock"),
});
