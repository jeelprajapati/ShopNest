import express from "express";
import cors from "cors";
import db from "./connect/db.js";
import bodyParser from "body-parser";
import authRoute from "./routes/Auth.js";
import userRoute from "./routes/User.js";
import productRoute from "./routes/Product.js";
import orderRoute from "./routes/Order.js";
import stripeRoute from "./routes/Stripe.js";
import standardRoute from "./routes/Standard.js";
import categoryRoute from "./routes/Category.js";
import messageRoute from "./routes/Message.js";
import dotenv from "dotenv";
import createError from "./utils/createError.js";
dotenv.config();

const app = express();

const corsOptions ={
  origin:'*', 
  credentials:true,            
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
db();

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", stripeRoute);
app.use("/api/user", userRoute);
app.use("/api/standard", standardRoute);
app.use("/api/category",categoryRoute);
app.use("/api/message",messageRoute)
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something won't Wrong!";
  return res.status(errorStatus).send(createError(errorStatus, errorMessage));
});
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
