// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//    api_key: process.env.CLOUDINARY_API_KEY,
//    api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadonCloudinary = async (localFilePath) => {
//    try {
//       if (!localFilePath) return null;

//       // Upload the file on Cloudinary
//       const response = await cloudinary.uploader.upload(localFilePath, {
//          resource_type: "auto", // Make sure to use a string here.
//       });

//       // File has been uploaded successfully
//       console.log("File is uploaded on Cloudinary", response.url);
//       return response;
//    } catch (error) {
//       console.error("Error uploading to Cloudinary:", error);
//       if (fs.existsSync(localFilePath)) {
//          fs.unlinkSync(localFilePath); // Remove the locally saved temp file if it exists
//       }
//       return null;
//    }
// };

// export { uploadonCloudinary };

// cloudinary.v2.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadonCloudinary = async (localFilePath) => {
   try {
      // Check if local file path is provided
      if (!localFilePath) {
         throw new Error("Local file path is missing.");
      }

      // Upload the file to Cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "auto", // Automatically detect the file type
      });

      // Log the Cloudinary URL for debugging
      console.log("File uploaded to Cloudinary:", response.url);

      // Delete the local file after successful upload
      fs.unlinkSync(localFilePath);
      console.log("Local file deleted:", localFilePath);

      // Return the Cloudinary response
      return response;
   } catch (error) {
      // Log the error for debugging
      console.error("Error uploading to Cloudinary:", error.message);

      // Delete the local file if it exists
      if (fs.existsSync(localFilePath)) {
         fs.unlinkSync(localFilePath);
         console.log("Local file deleted after failed upload:", localFilePath);
      }

      // Return null or throw the error depending on your use case
      return null;
   }
};

export { uploadonCloudinary };
