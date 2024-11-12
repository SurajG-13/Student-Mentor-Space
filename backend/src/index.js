// require("dotenv").config({ path: "./env" });

import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is Running at Port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Express Connection Error`, err);
  });
