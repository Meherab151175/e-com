import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { IQuery } from "./product.interface";
import { Product } from "./product.model";
import { Request, Response } from "express";

export const createProduct = async (product, file) => {
  const { name, price, category } = product;
  if (!name || !price || !category) {
    throw new Error("Name, price, and category are required");
  }
  let productData;
  if (file) {
    const imageName = `${Date.now()}${name}`;
    const path = req.file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    productData = { ...product, image: secure_url };
  }

  return await Product.create(productData);
};

export const updateProduct = async (id, product) => {
  const { status, description, discount } = product;
  return await Product.findByIdAndUpdate(
    id,
    {
      ...product,
      status,
      description,
      discount,
    },
    {
      new: true,
    }
  );
};

export const getAllProducts = async (queryObj: IQuery) => {
  const { category, name } = queryObj;

  const query: any = {};
  if (category) {
    query.category = category;
  }
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  const products = await Product.find(query);

  const formattedProduct = products.map((product) => {
    const originalPrice = product.price;
    const discount = product.discount || 0;
    const finalPrice = originalPrice * (1 - discount / 100);

    return {
      ...product.toObject(),
      originalPrice,
      finalPrice: Number(finalPrice.toFixed(2)), // Round to 2 decimal places
    };
  });
  return formattedProduct;
};
