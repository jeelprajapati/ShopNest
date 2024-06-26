import express from "express";
import { deleteMessage, getMessage, getMessages, sendMessage } from "../controller/message.controller.js";
import { verifyToken, verifyTokenAndAdmin } from "../middleware/verifyToken.js";
const route = express.Router();

//get message
route.get("/",verifyTokenAndAdmin,getMessages);

//send message
route.post("/send",verifyToken,sendMessage);

//get single message
route.get("/:id",verifyTokenAndAdmin,getMessage);

//delete message
route.delete("/delete/:id",verifyTokenAndAdmin,deleteMessage);

export default route