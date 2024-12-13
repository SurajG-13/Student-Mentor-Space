import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../models/student.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

// Method for Tokens

const generateAccessAndRefreshToken = async (studentId) => {
   try {
      const student = await Student.findById(studentId);
      const accessToken = student.generateAccessToken();
      const refreshToken = student.generateRefreshToken();

      student.refreshToken = refreshToken;
      await student.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
   } catch (error) {
      throw new ApiError(500, "Token Generation Failed!");
   }
};

// Register Student

const registerStudent = asyncHandler(async (req, res) => {
   const { studentName, eMail, studentPassword, role } = req.body;

   if (
      [studentName, eMail, studentPassword, role].some(
         (field) => field?.trim() === ""
      )
   ) {
      throw new ApiError(
         400,
         "All Fields (studentName, eMail, studentPassword, role) are Required!"
      );
   }

   if (role !== "Student") {
      throw new ApiError(
         400,
         "Invalid role specified. Only 'Student' role is allowed."
      );
   }

   const existingStudent = await Student.findOne({ eMail });
   if (existingStudent) {
      throw new ApiError(400, "Student with this email already exists.");
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

   // Create student, MongoDB will automatically generate userId (_id)

   const student = await Student.create({
      fullName,
      avatar: avatarUrl,
      eMail,
      studentPassword,
      role,
   });

   // Optionally, remove sensitive data from the response (e.g., studentPassword)

   const createdStudent = await Student.findById(student._id).select(
      "-studentPassword, -refreshToken"
   );

   if (!createdStudent) {
      throw new ApiError(500, "Something Went Wrong While Registering Student");
   }

   return res
      .status(201)
      .json(
         new ApiResponse(200, createdStudent, "Student Created Successfully!")
      );
});

// Code for Student Login :

const loginStudent = asyncHandler(async (req, res) => {
   const { eMail, studentPassword } = req.body;

   const student = await Student.findOne({ $or: [{ eMail }] });

   if (!student) {
      throw new ApiError(404, "Student does not exist");
   }

   const isStudentPasswordValid =
      await student.isStudentPasswordCorrect(studentPassword);

   if (!isStudentPasswordValid) {
      throw new ApiError(401, "Incorrect Password!");
   }

   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      student._id
   );

   const loggedInStudent = await Student.findById(student._id).select(
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
            { student: loggedInStudent, accessToken, refreshToken },
            "Student Logged in Successfully"
         )
      );
});

export { generateAccessAndRefreshToken, registerStudent, loginStudent };

// Get all students

export const getStudents = async (req, res) => {
   try {
      const students = await Student.find().populate(
         "studentName department marks"
      );
      res.status(200).json(students);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get student details by ID
export const getStudentById = async (req, res) => {
   try {
      const { studentId } = req.params;

      const student = await Student.findById(studentId).populate(
         "studentName department marks"
      );
      if (!student) {
         return res.status(404).json({ message: "Student not found" });
      }

      res.status(200).json(student);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update student details
export const updateStudent = async (req, res) => {
   try {
      const { studentId } = req.params;
      const { studentName, department, registrationNumber, semester } =
         req.body;

      const updatedStudent = await Student.findByIdAndUpdate(
         studentId,
         { studentName, department, registrationNumber, semester },
         { new: true }
      );

      if (!updatedStudent) {
         return res.status(404).json({ message: "Student not found" });
      }

      res.status(200).json(updatedStudent);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Delete student
export const deleteStudent = async (req, res) => {
   try {
      const { studentId } = req.params;

      const deletedStudent = await Student.findByIdAndDelete(studentId);
      if (!deletedStudent) {
         return res.status(404).json({ message: "Student not found" });
      }

      res.status(200).json({ message: "Student deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
