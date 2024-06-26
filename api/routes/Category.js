import express from "express";
import { addCategory, getCategory } from "../controller/category.controller.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";
const route = express.Router();

//get category
route.get("/",getCategory);

//add category
route.post("/add",verifyTokenAndAdmin,addCategory);

export default route