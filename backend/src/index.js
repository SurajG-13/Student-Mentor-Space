// import connectDB from "./db/index.js";
// import dotenv from "dotenv";
// import { app } from "./app.js";

// dotenv.config({
//   path: "./.env",
// });

// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`Server is Running at Port: ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(`Express Connection Error`, err);
//   });

import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
   path: "./.env",
});

const PORT = process.env.PORT || 5000;

connectDB()
   .then(() => {
      app.listen(PORT, "0.0.0.0", () => {
         console.log(`✅ Server is running at http://localhost:${PORT}`);
      });
   })
   .catch((err) => {
      console.log("Express Connection Error:", err);
   });
