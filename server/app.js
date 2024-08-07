import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
import bcrypt from "bcryptjs";

dotenv.config();
console.log("Environment Variables Loaded:");
console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", router);
app.use("/blog", blogRouter);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => app.listen(PORT))
  .then(() =>
    console.log(`Connected To Database and listening at PORT ${PORT}`)
  )
  .catch((err) => console.log(err));
