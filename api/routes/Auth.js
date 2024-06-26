import express from "express";
import { ChangePassword, Login, Register } from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const route = express.Router();

//Register request
route.post("/register", Register);

//Login request
route.post("/login", Login);

//change password
route.post("/changePassword",verifyToken,ChangePassword)
export default route;
