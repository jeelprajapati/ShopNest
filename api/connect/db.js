import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const db = () => {
  mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
};

export default db
