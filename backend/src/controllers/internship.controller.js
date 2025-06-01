import { Internship } from "../models/internship.model.js";
import { Student } from "../models/student.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Add Internship (Student only)
export const createInternship = asyncHandler(async (req, res) => {
   if (!req.user || req.user.role !== "Student") {
      throw new ApiError(401, "Unauthorized - User is not a student.");
   }

   const { companyName, internshipDuration, joinDate, internshipSource } =
      req.body;

   const newInternship = new Internship({
      companyName,
      internshipDuration,
      joinDate,
      internshipSource,
      studentId: req.user._id,
   });

   await newInternship.save();

   // Optionally, add internship ID to student document if you keep an array
   // await Student.findByIdAndUpdate(req.user._id, { $push: { internships: newInternship._id } });

   res.status(201).json({
      success: true,
      data: newInternship,
      message: "Internship created successfully",
   });
});

// Get internships for authenticated student
export const getInternshipsForStudent = asyncHandler(async (req, res) => {
   if (!req.user || req.user.role !== "Student") {
      throw new ApiError(401, "Unauthorized - User is not a student.");
   }

   const internships = await Internship.find({ studentId: req.user._id });

   res.status(200).json({
      success: true,
      data: internships,
   });
});

// Update internship by ID (Student only)
export const updateInternship = asyncHandler(async (req, res) => {
   const { internshipId } = req.params;

   if (!req.user || req.user.role !== "Student") {
      throw new ApiError(401, "Unauthorized - User is not a student.");
   }

   const internship = await Internship.findById(internshipId);

   if (!internship) {
      throw new ApiError(404, "Internship not found.");
   }

   if (internship.studentId.toString() !== req.user._id.toString()) {
      throw new ApiError(
         403,
         "Forbidden - You can only update your own internships."
      );
   }

   const updatedData = req.body;

   const updatedInternship = await Internship.findByIdAndUpdate(
      internshipId,
      updatedData,
      {
         new: true,
         runValidators: true,
      }
   );

   res.status(200).json({
      success: true,
      data: updatedInternship,
   });
});

// Delete internship by ID (Student only)
export const deleteInternship = asyncHandler(async (req, res) => {
   const { internshipId } = req.params;

   if (!req.user || req.user.role !== "Student") {
      throw new ApiError(401, "Unauthorized - User is not a student.");
   }

   const internship = await Internship.findById(internshipId);

   if (!internship) {
      throw new ApiError(404, "Internship not found.");
   }

   if (internship.studentId.toString() !== req.user._id.toString()) {
      throw new ApiError(
         403,
         "Forbidden - You can only delete your own internships."
      );
   }

   await Internship.findByIdAndDelete(internshipId);

   res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
   });
});

// Get internships by student roll number (Teacher/Admin)
export const getInternshipsByStudentRoll = asyncHandler(async (req, res) => {
   if (
      !req.user ||
      (req.user.role !== "Teacher" && req.user.role !== "Admin")
   ) {
      throw new ApiError(401, "Unauthorized - Access denied.");
   }

   const { rollNumber } = req.params;

   const student = await Student.findOne({ rollNumber });

   if (!student) {
      throw new ApiError(404, "Student not found.");
   }

   const internships = await Internship.find({ studentId: student._id });

   res.status(200).json({
      success: true,
      data: internships,
   });
});
