import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../models/student.model.js";
import { Department } from "../models/department.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
   const {
      studentName,
      eMail,
      studentPassword,
      role,
      rollNumber,
      department,
      registrationNumber,
      admissionYear,
      xMarks,
      xiiMarks,
      diplomaMarks,
      pinCode,
      localArea,
      postOffice,
      dateOfBirth,
      contactNumber,
   } = req.body;

   if (
      [studentName, eMail, studentPassword, role, rollNumber].some(
         (field) => field?.trim() === ""
      )
   ) {
      throw new ApiError(
         400,
         "All Fields (studentName, eMail, studentPassword, role, rollNumber) are Required!"
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
      studentName,
      avatar: avatarUrl,
      eMail,
      studentPassword,
      role,
      rollNumber,
      department,
      registrationNumber,
      admissionYear,
      xMarks,
      xiiMarks,
      diplomaMarks,
      pinCode,
      localArea,
      postOffice,
      dateOfBirth,
      contactNumber,
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

// const loginStudent = asyncHandler(async (req, res) => {
//    const { eMail, studentPassword } = req.body;

//    const student = await Student.findOne({ $or: [{ eMail }] });

//    if (!student) {
//       throw new ApiError(404, "Student does not exist");
//    }

//    const isStudentPasswordValid =
//       await student.isStudentPasswordCorrect(studentPassword);

//    if (!isStudentPasswordValid) {
//       throw new ApiError(401, "Incorrect Password!");
//    }

//    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
//       student._id
//    );

//    const loggedInStudent = await Student.findById(student._id).select(
//       "-password -refreshToken"
//    );

//    const options = {
//       httpOnly: true,
//       secure: true,
//    };

//    return res
//       .status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", refreshToken, options)
//       .json(
//          new ApiResponse(
//             200,
//             { student: loggedInStudent, accessToken, refreshToken },
//             "Student Logged in Successfully"
//          )
//       );
// });

const loginStudent = asyncHandler(async (req, res) => {
   const { eMail, studentPassword } = req.body;

   const student = await Student.findOne({ $or: [{ eMail }] }).populate(
      "department"
   ); // <-- populated department

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

   // Use populated student object here (excluding sensitive fields)
   const loggedInStudent = await Student.findById(student._id)
      .select("-studentPassword -refreshToken")
      .populate("department"); // <-- populated department

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

// export { generateAccessAndRefreshToken, registerStudent, loginStudent };

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

// export const getStudent = async (req, res) => {
//    try {
//       const { rollNumber } = req.params;

//       const student = await Student.findOne({ rollNumber });

//       if (!student) {
//          return res.status(404).json({ message: "Student not found" });
//       }

//       res.status(200).json(student);
//    } catch (error) {
//       res.status(500).json({ message: error.message });
//    }
// };

// export const getStudents = async (req, res) => {
//    try {
//       const students = await Student.find().populate("department"); // <-- populated department
//       res.status(200).json(students);
//    } catch (error) {
//       res.status(500).json({ message: error.message });
//    }
// };

export const getStudent = async (req, res) => {
   try {
      const { rollNumber } = req.params;

      const student = await Student.findOne({ rollNumber }).populate(
         "department"
      ); // <-- populated department

      if (!student) {
         return res.status(404).json({ message: "Student not found" });
      }

      res.status(200).json(student);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update Student Details

// export const updateStudent = asyncHandler(async (req, res) => {
//    try {
//       const { rollNumber } = req.params;
//       const {
//          registrationNumber,
//          department,
//          admissionYear,
//          xMarks,
//          xiiMarks,
//          diplomaMarks,
//          pinCode,
//          localArea,
//          postOffice,
//          dateOfBirth,
//          contactNumber,
//       } = req.body;

//       const existingStudent = await Student.findOne({ rollNumber });

//       if (!existingStudent) {
//          return res.status(404).json({ message: "Student not found" });
//       }

//       const updatedStudent = await Student.findOneAndUpdate(
//          { rollNumber },
//          {
//             $set: {
//                registrationNumber,
//                department,
//                admissionYear,
//                xMarks,
//                xiiMarks,
//                diplomaMarks,
//                pinCode,
//                localArea,
//                postOffice,
//                dateOfBirth,
//                contactNumber,
//             },
//          },
//          {
//             new: true,
//             runValidators: true,
//          }
//       );

//       if (!updatedStudent) {
//          return res
//             .status(500)
//             .json({ message: "Failed to update student details" });
//       }

//       res.status(200).json(updatedStudent);
//    } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: error.message });
//    }
// });

export const updateStudent = asyncHandler(async (req, res) => {
   const { rollNumber } = req.params;
   const {
      department,
      studentName,
      eMail,
      contactNumber,
      dateOfBirth,
      registrationNumber,
      localArea,
      postOffice,
      pinCode,
      xMarks,
      xiiMarks,
      diplomaMarks,
      admissionYear,
      // other fields...
   } = req.body;

   // Validate department ObjectId if provided
   if (department) {
      if (!mongoose.Types.ObjectId.isValid(department)) {
         throw new ApiError(400, "Invalid department ID");
      }
      const deptExists = await Department.findById(department);
      if (!deptExists) {
         throw new ApiError(400, "Department not found");
      }
   }

   const updatedStudent = await Student.findOneAndUpdate(
      { rollNumber },
      {
         $set: {
            department,
            studentName,
            eMail,
            contactNumber,
            dateOfBirth,
            registrationNumber,
            localArea,
            postOffice,
            pinCode,
            xMarks,
            xiiMarks,
            diplomaMarks,
            admissionYear,
            // other fields...
         },
      },
      { new: true, runValidators: true }
   );

   if (!updatedStudent) {
      throw new ApiError(404, "Student not found");
   }

   res.status(200).json(updatedStudent);
});

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

// Login Student - **CHANGED: populate department and consistent response**

// Get all students - **CHANGED: populate department**

// Get student details by rollNumber - **CHANGED: populate department**

// New: Get logged-in student's profile by ID - **ADDED**
export const getLoggedInStudentProfile = asyncHandler(async (req, res) => {
   const student = await Student.findById(req.user._id).populate("department"); // <-- populated department
   if (!student) {
      return res.status(404).json({ message: "Student not found" });
   }
   res.status(200).json(student);
});

// export const logoutStudent = asyncHandler(async (req, res) => {
//    // Clear the JWT cookies by setting empty values and maxAge 0
//    res.cookie("accessToken", "", { httpOnly: true, secure: true, maxAge: 0 });
//    res.cookie("refreshToken", "", { httpOnly: true, secure: true, maxAge: 0 });

//    res.status(200).json({ message: "Logged out successfully" });
// });

export const logoutStudent = asyncHandler(async (req, res) => {
   Student.findByIdAndUpdate(req.user._id, {
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
      .json(new ApiResponse(200, {}, "Student Logged Out"));
});

export { generateAccessAndRefreshToken, registerStudent, loginStudent };
