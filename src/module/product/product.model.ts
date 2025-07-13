import mongoose from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    image: String,
    status: {
      type: String,
      enum: ["In Stock", "Stock Out"],
      default: "In Stock",
    },
    productCode: {
      type: String,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  if (this.isNew && !this.productCode) {
    const name = this.name.toLowerCase();
    let maxLen = 0;
    let subs: string[] = [];
    let startIndices: number[] = [];

    for (let i = 0; i < name.length; i++) {
      let sub = name[i];
      let j = i;

      while (j + 1 < name.length && name[j] < name[j + 1]) {
        j++;
        sub += name[j];
      }

      if (sub.length > maxLen) {
        maxLen = sub.length;
        subs = [sub];
        startIndices = [i];
      } else if (sub.length === maxLen) {
        subs.push(sub);
        startIndices.push(i);
      }

      i = j;
    }

    const finalSubstring = subs.join("");
    const start = startIndices[0];
    const end = start + subs[0].length - 1;
    const hash = crypto
      .createHash("sha1")
      .update(this.name)
      .digest("hex")
      .slice(0, 8);

    this.productCode = `${hash}-${start}${finalSubstring}${end}`;
  }
  next();
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
