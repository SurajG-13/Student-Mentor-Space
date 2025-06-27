import LabMarks from "../models/labMark.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Save or update marks for a student's semester
export const saveOrUpdateLabMarks = asyncHandler(async (req, res) => {
   const { semesterNo, labSubjects } = req.body;
   const { _id: studentId, rollNumber, department } = req.user;

   if (!Array.isArray(labSubjects) || labSubjects.length === 0) {
      return res.status(400).json({ error: "Subjects array is required" });
   }

   // Validate each subject entry has a labSubject ObjectId reference
   for (const sub of labSubjects) {
      if (!sub.labSubject) {
         return res.status(400).json({
            error: "Each subject must include a 'labSubject' ObjectId reference",
         });
      }
   }

   // Find existing LabMarks document for the student by rollNumber
   let marks = await LabMarks.findOne({ rollNumber });

   if (!marks) {
      // If no document exists, create a new one with the semester and subjects
      marks = new LabMarks({
         studentId,
         rollNumber,
         department,
         semesters: [{ semesterNo, subjects: labSubjects }],
      });
   } else {
      // Check if the semester already exists
      const semesterIndex = marks.semesters.findIndex(
         (s) => s.semesterNo === semesterNo
      );

      if (semesterIndex !== -1) {
         // Update existing semester's subjects
         marks.semesters[semesterIndex].subjects = labSubjects;
      } else {
         // Add new semester with subjects
         marks.semesters.push({ semesterNo, subjects: labSubjects });
      }
   }

   await marks.save();

   res.status(200).json({ message: "Marks saved successfully." });
});

// Get marks for logged-in student
export const getStudentLabMarks = asyncHandler(async (req, res) => {
   const { rollNumber } = req.user;
   const marks = await LabMarks.findOne({ rollNumber })
      .populate("department")
      .populate("semesters.subjects.labSubject"); // populate nested labSubject references

   if (!marks) {
      return res.status(404).json({ error: "No marks found." });
   }

   res.status(200).json(marks);
});

// Get marks by roll number (for teacher/admin)
export const getLabMarksByRoll = asyncHandler(async (req, res) => {
   const { rollNumber } = req.params;
   const marks = await LabMarks.findOne({ rollNumber })
      .populate("department")
      .populate("semesters.subjects.labSubject"); // populate nested labSubject references

   if (!marks) {
      return res.status(404).json({ error: "No marks found." });
   }

   res.status(200).json(marks);
});
