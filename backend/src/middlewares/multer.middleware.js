import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure the upload directory exists
const uploadDir = "./public/temp";
if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, uploadDir);
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname); // Unique filename
   },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
   const allowedTypes = /jpeg|jpg|png|gif/;
   const mimeType = allowedTypes.test(file.mimetype);
   const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
   );
   if (mimeType && extname) {
      cb(null, true); // Accept file
   } else {
      cb(new Error("Only image files are allowed"), false); // Reject file
   }
};

// Create Multer instance
export const upload = multer({
   storage,
   fileFilter,
   limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
   },
});
