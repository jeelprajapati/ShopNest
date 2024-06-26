import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    item: { require: true, type: String },
    image: { require: true, type: Array },
    description: { require: true, type: String },
    price: { require: true, type: Number },
    category: {
      type:  mongoose.Schema.ObjectId,
      ref:"Category",
      require:true
    },
    color: { type: Array },
    size: { type: Array },
    quantity: { type: Number, require: true },
    totalStar: { type: Number, default: 0 },
    starNumber: { type: Number, default: 0 },
    tags: { type: Array },
    favorite:{ type: Array }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
