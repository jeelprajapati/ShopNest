import express from "express";
import { getColor, getTags } from "../controller/standard.controller.js";

const route=express.Router();

// get color
route.get("/getColors",getColor);

// get tags
route.get("/getTags",getTags);

export default route;