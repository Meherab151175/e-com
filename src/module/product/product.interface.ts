import { Types } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  status: "Stock Out" | "In Stock";
  productCode?: string;
  category: Types.ObjectId;
}

export interface IQuery {
  name?: string;
  price?: number;
  discount?: number;
}
