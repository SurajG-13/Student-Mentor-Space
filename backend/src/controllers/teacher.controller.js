import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teacher.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

// Method for Tokens :

const generateAccessAndRefreshToken = async (teacherId) => {
   try {
      const teacher = await Teacher.findById(teacherId);
      const accessToken = teacher.generateAccessToken();
      const refreshToken = teacher.generateRefreshToken();

      teacher.refreshToken = refreshToken;
      await teacher.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
   } catch (error) {
      throw new ApiError(500, "Token Generation Failed!");
   }
};

// Code for Teacher Registration :

const registerTeacher = asyncHandler(async (req, res) => {
   const { fullName, eMail, teacherPassword, role } = req.body;

   if (
      [fullName, eMail, teacherPassword, role].some(
         (field) => field?.trim() === ""
      )
   ) {
      throw new ApiError(
         400,
         "All Fields (fullName, eMail, teacherPassword, role) are Required!"
      );
   }

   if (role !== "Teacher") {
      throw new ApiError(
         400,
         "Invalid role specified. Only 'Teacher' role is allowed."
      );
   }

   const existingTeacher = await Teacher.findOne({ eMail });
   if (existingTeacher) {
      throw new ApiError(400, "Teacher with this email already exists.");
   }

   let avatarUrl = null;

   if (req.files?.avatar) {
      const avatarLocalPath = req.files.avatar[0]?.path;

      if (!avatarLocalPath) {
         throw new ApiError(400, "Avatar Missing!");
      }

      const avatar = await uploadonCloudinary(avatarLocalPath);
      if (!avatar) {
         throw new ApiError(400, "Avatar Upload Failed!");
      }

      avatarUrl = avatar.url;
   }

   // Create teacher, MongoDB will automatically generate userId (_id)

   const teacher = await Teacher.create({
      fullName,
      avatar: avatarUrl,
      eMail,
      teacherPassword,
      role,
   });

   // Optionally, remove sensitive data from the response (e.g., teacherPassword)

   const createdTeacher = await Teacher.findById(teacher._id).select(
      "-teacherPassword, -refreshToken"
   );

   if (!createdTeacher) {
      throw new ApiError(500, "Something Went Wrong While Registering Teacher");
   }

   return res
      .status(201)
      .json(
         new ApiResponse(200, createdTeacher, "Teacher Created Successfully!")
      );
});

// Code for Teacher Log-in :

const loginTeacher = asyncHandler(async (req, res) => {
   const { eMail, teacherPassword } = req.body;

   const teacher = await Teacher.findOne({ $or: [{ eMail }] });

   if (!teacher) {
      throw new ApiError(404, "Teacher does not exist");
   }

   const isTeacherPasswordValid =
      await teacher.isTeacherPasswordCorrect(teacherPassword);

   if (!isTeacherPasswordValid) {
      throw new ApiError(401, "Incorrect Password!");
   }

   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      teacher._id
   );

   const loggedInTeacher = await Teacher.findById(teacher._id).select(
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
            { teacher: loggedInTeacher, accessToken, refreshToken },
            "Teacher Logged in Successfully"
         )
      );
});

// Code for Teacher Log-Out :

const logoutTeacher = asyncHandler(async (req, res) => {
   Teacher.findByIdAndUpdate(req.teacher._id, {
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
      .json(new ApiResponse(200, {}, "Teacher Logged Out"));
});

// Code for RefreshToken :

const refreshAccessToken = asyncHandler(async (req, res) => {
   const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
   if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized Request!");
   }
   try {
      const decodedToken = jwt.verify(
         incomingRefreshToken,
         process.env.REFRESH_TOKEN_SECRET
      );

      const teacher = await Teacher.findById(decodedToken?._id);

      if (!teacher) {
         throw new ApiError(401, "Invalid Refresh Token");
      }

      if (incomingRefreshToken !== teacher?.refreshToken) {
         throw new ApiError(401, "Refresh Token Expired");
      }

      const options = {
         httpOnly: true,
         secure: true,
      };

      const { accessToken, newRefreshToken } =
         await generateAccessAndRefreshToken(teacher._id);

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

export { registerTeacher, loginTeacher, logoutTeacher, refreshAccessToken };
