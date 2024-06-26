import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    image: { type: String, require: true },
    name: { type: String, require: true },
    subCategory: { type: Array },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
