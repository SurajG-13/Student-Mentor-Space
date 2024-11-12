import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadonCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Upload the file on cloudinary
    const respone = await cloudinary.uploader.upload(localFilePath, {
      resource_type: auto,
    });

    // File Has Been Uploaded Successfully
    console.log("File is Uploaded on Cloudinary", respone.url);
    return respone;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Remove the locally saved temp file
    return null;
  }
};

export { uploadonCloudinary };

// cloudinary.v2.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
