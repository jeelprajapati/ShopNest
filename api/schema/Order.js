import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    total: { type: Number, require: true },
    stripeId: { type: String, require: true },
    status: { type: String, default: "Panding" },
    payment: { type: String, default: "Panding" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
