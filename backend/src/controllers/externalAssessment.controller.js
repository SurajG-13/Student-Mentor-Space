import { externalAssessment } from "../models/externalAssessment.model.js";
import { Subject } from "../models/subject.model.js";
import { Student } from "../models/student.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";

// Create a new externalAssessment
const createExternalAssessment = asyncHandler(async (req, res) => {
   try {
      const { UPID, totalCredit } = req.body;

      // Finding subject by UPID instead of ID
      const subject = await Subject.findOne({ UPID });
      if (!subject) {
         return res.status(400).json({ message: "Subject not found" });
      }

      const newExternalAssessment = new externalAssessment({
         subject: UPID,
         totalCredit,
      });

      await newExternalAssessment.save();
      res.status(201).json(newExternalAssessment);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Get all externalAssessments by subject (using UPID)
const getExternalAssessmentBySubject = asyncHandler(async (req, res) => {
   try {
      const { UPID } = req.params;

      // Fetching external assessments by subject UPID
      const externalAssessments = await externalAssessment.find({
         subject: UPID,
      });

      if (!externalAssessments) {
         return res
            .status(404)
            .json({ message: "No assessments found for this subject" });
      }

      res.status(200).json(externalAssessments);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Get externalAssessment by ID
const getExternalAssessmentById = asyncHandler(async (req, res) => {
   try {
      const externalAssessment = await externalAssessment.findById(
         req.params.id
      );
      if (!externalAssessment) {
         return res
            .status(404)
            .json({ message: "ExternalAssessment not found" });
      }
      res.status(200).json(externalAssessment);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Add externalAssessment marks for a student (using rollNumber for student)
const addExternalAssessmentMarks = asyncHandler(async (req, res) => {
   try {
      const { rollNumber, UPID, marks } = req.body;

      // Finding student by rollNumber
      const student = await Student.findOne({ rollNumber });
      if (!student) {
         return res.status(404).json({ message: "Student not found" });
      }

      // Finding subject by UPID
      const externalAssessment = await externalAssessment.findOne({
         subject: UPID,
      });
      if (!externalAssessment) {
         return res
            .status(404)
            .json({ message: "ExternalAssessment not found for the subject" });
      }

      // Find the externalAssessment in the student's semesters
      const semester = student.semesters.find((sem) =>
         sem.subjects.includes(externalAssessment.subject)
      );
      if (!semester) {
         return res.status(404).json({
            message: "ExternalAssessment not found in student's semester",
         });
      }

      const externalAssessmentRecord = semester.externalAssessments.find(
         (e) => e.subject.toString() === externalAssessment.subject.toString()
      );
      if (!externalAssessmentRecord) {
         semester.externalAssessments.push({
            subject: externalAssessment.subject,
            date: externalAssessment.date,
            marks,
         });
      } else {
         externalAssessmentRecord.marks = marks;
      }

      await student.save();
      res.status(200).json(student);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

export {
   createExternalAssessment,
   getExternalAssessmentBySubject,
   getExternalAssessmentById,
   addExternalAssessmentMarks,
};
