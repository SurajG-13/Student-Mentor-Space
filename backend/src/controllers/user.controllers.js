import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Student } from "../models/student.model.js";
import { Teacher } from "../models/teacher.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

// Method for Tokens :

const generateAccessAndRefreshToken = async (userId) => {
   try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
   } catch (error) {
      throw new ApiError(500, "Token Generation Failed!");
   }
};

// Code for User Registration :

const registerUser = asyncHandler(async (req, res) => {
   // res.status(200).json({ message: "OK" });

   const { fullName, eMail, userPassword, role } = req.body;

   // if (fullName == "") {
   //   throw new ApiError(400, "fullName is Required");
   // }

   if (
      [fullName, eMail, userPassword, role].some(
         (field) => field?.trim() === ""
      )
   ) {
      throw new ApiError(400, "All Fields are Required!");
   }

   const existedUser = await User.findOne({
      $or: [{ eMail }],
   });

   if (existedUser) {
      throw new ApiError(400, "Credentials already Exists!");
   }

   // const avatarLocalPath = req.files?.avatar[0]?.path;

   // if (!avatarLocalPath) {
   //   throw new ApiError(400, "Avatar Missing!");
   // }

   // const avatar = await uploadonCloudinary(avatarLocalPath);

   // if (!avatar) {
   //   throw new ApiError(400, "Avatar Upload Failed!");
   // }

   let avatarUrl = null; // Set avatar to null initially

   if (req.files?.avatar) {
      const avatarLocalPath = req.files.avatar[0]?.path; // Access file path if available

      if (!avatarLocalPath) {
         throw new ApiError(400, "Avatar Missing!");
      }

      // Upload the avatar to Cloudinary if provided
      const avatar = await uploadonCloudinary(avatarLocalPath);

      if (!avatar) {
         throw new ApiError(400, "Avatar Upload Failed!");
      }

      avatarUrl = avatar.url; // Store the URL if avatar is uploaded successfully
   }

   const user = await User.create({
      fullName,
      avatar: avatarUrl,
      eMail,
      userPassword,
      role,
   });

   // Depending on the role, create either a student or a teacher profile

   if (role === "Student") {
      await Student.create({
         userId: user._id,
      });
   } else if (role === "Teacher") {
      await Teacher.create({
         userId: user._id,
      });
   } else {
      throw new ApiError(400, "Invalid role specified.");
   }

   const createdUser = await User.findById(user._id).select(
      "-userPassword -refreshToken"
   );

   if (!createdUser) {
      throw new ApiError(500, "Something Went Wrong While Registration!");
   }

   return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User Created Successfully!"));
});

// Code for User Log-in :

const loginUser = asyncHandler(async (req, res) => {
   const { eMail, userPassword } = req.body;

   // const user = User.findOne({ eMail });

   const user = await User.findOne({ $or: [{ eMail }] });

   if (!user) {
      throw new ApiError(404, "User does not exist");
   }

   const isuserPasswordValid = await user.isuserPasswordCorrect(userPassword);

   if (!isuserPasswordValid) {
      throw new ApiError(401, "Incorrect Password!");
   }

   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
   );

   const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
   );

   const options = {
      httpOnly: true,
      secure: true,
   };

   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
         new ApiResponse(
            200,
            { user: loggedInUser, accessToken, refreshToken },
            "User Logged in Successfully"
         )
      );
});

// Code for User Log-Out :

const logoutUser = asyncHandler(async (req, res) => {
   User.findByIdAndUpdate(req.user._id, {
      $set: { refreshToken: undefined },
   });

   const options = {
      httpOnly: true,
      secure: true,
   };

   return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User Logged Out"));
});

// Code for RefreshToken :

const refreshAccessToken = asyncHandler(async (req, res) => {
   const incomingRefreshToken =
      req.cookies.refreshhToken || req.body.refreshToken;
   if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized Request!");
   }
   try {
      const decodedToken = jwt.verify(
         incomingRefreshToken,
         process.env.REFRESH_TOKEN_SECRET
      );

      const user = await User.findById(decodedToken?._id);

      if (!user) {
         throw new ApiError(401, "Invalid Refresh Token");
      }

      if (incomingRefreshToken !== user?.refreshToken) {
         throw new ApiError(401, "Refresh Token Expired");
      }

      const options = {
         httpOnly: true,
         secure: true,
      };

      const { accessToken, newRefreshToken } =
         await generateAccessAndRefreshToken(user._id);

      return res
         .status(200)
         .cookie("accessToken", accessToken)
         .cookie("refreshToken", newRefreshToken)
         .json(
            new ApiResponse(
               200,
               { accessToken, refreshToken: newRefreshToken },
               "Access Token Refreshed"
            )
         );
   } catch (error) {
      throw new ApiError(401, error?.message || "Invalid Refresh Token");
   }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };

/*  Algo: 

How is loginUser working?

req.body -> data
userName or eMail
find the user
check the password
access and refresh token
send cookie
*/
