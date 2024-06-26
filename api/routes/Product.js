import express from "express";
import {
  addInFavorite,
  addProduct,
  deleteProduct,
  getFavoriteByUserid,
  getProduct,
  getProducts,
  searchProduct,
  updateProduct,
} from "../controller/product.controller.js";
import { verifyToken, verifyTokenAndAdmin } from "../middleware/verifyToken.js";
const route = express.Router();

//get all product
route.post("/", getProducts);

//search product
route.post("/search", searchProduct);

//get single product
route.get("/single/:id", getProduct);

//add product
route.post("/add", verifyTokenAndAdmin, addProduct);

//update product
route.put("/:id", verifyTokenAndAdmin, updateProduct);

//delete product
route.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//getFavoriteByUserid
route.get("/getFavoriteByUserid",verifyToken,getFavoriteByUserid);

//add in favorite
route.put("/addInFavorite/:id",verifyToken,addInFavorite);


export default route;
