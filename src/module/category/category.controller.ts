import catchAsync from "../../utils/catchAsync";
import Category from "./category.model";

export const createCategory = catchAsync(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }
  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    data: category,
    message: "Category created successfully",
  });
});
