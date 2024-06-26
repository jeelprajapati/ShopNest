import express from "express";
import { deleteUser, getUser, getUsers, stats, updateUser } from "../controller/user.controller.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";
const route = express.Router();

//get all product
route.get("/",verifyTokenAndAdmin, getUsers);
//get single product
route.get("/single/:id",verifyTokenAndAdmin, getUser);
//update product
route.put("/:id", verifyTokenAndAdmin, updateUser);
//delete product
route.delete("/:id", verifyTokenAndAdmin, deleteUser);
//get stats
route.get('/stats',verifyTokenAndAdmin,stats);

export default route