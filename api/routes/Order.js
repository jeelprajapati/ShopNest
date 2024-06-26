import express from "express";
import { verifyToken, verifyTokenAndAdmin } from "../middleware/verifyToken.js";
import {
  addOrder,
  cancelOrder,
  deleteOrder,
  getOrder,
  getOrderByUserId,
  getOrders,
  income,
  updateOrder,
} from "../controller/order.controller.js";
const route = express.Router();

//get all product
route.get("/", verifyTokenAndAdmin, getOrders);
//get single product
route.get("/single/:id", verifyTokenAndAdmin, getOrder);
//get product by userid
route.get("/getOrderByUserId", verifyToken, getOrderByUserId);
//add product
route.post("/add", verifyToken, addOrder);
//update product
route.put("/:id", verifyTokenAndAdmin, updateOrder);
//delete product
route.delete("/:id", verifyTokenAndAdmin, deleteOrder);
//cancel order
route.put("/cancel/:id", verifyToken, cancelOrder);
//get income
route.get("/income",verifyTokenAndAdmin,income);

export default route;
