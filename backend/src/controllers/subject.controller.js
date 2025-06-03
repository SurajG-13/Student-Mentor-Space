// import Subject from "../models/subject.model.js";

// export async function getSubjectsByDeptAndSemester(req, res) {
//    const { department, semesterNo } = req.query;

//    if (!department || !semesterNo) {
//       return res
//          .status(400)
//          .json({ error: "Missing department or semesterNo parameter." });
//    }

//    try {
//       const subjects = await Subject.find({
//          department,
//          semesterNo: Number(semesterNo),
//       });

//       if (!subjects || subjects.length === 0) {
//          return res.status(404).json({ error: "No subjects found." });
//       }

//       res.status(200).json(subjects);
//    } catch (err) {
//       res.status(500).json({ error: err.message });
//    }
// }
// // import mongoose from "mongoose";
// // import Subject from "../models/subject.model.js";

// // export async function getSubjectsByDeptAndSemester(req, res) {
// //    try {
// //       const { department, semesterNo } = req.query;

// //       // Validate department ObjectId
// //       if (!mongoose.Types.ObjectId.isValid(department)) {
// //          return res.status(400).json({ error: "Invalid department ID." });
// //       }

// //       // Parse semesterNo and validate
// //       const semNo = Number(semesterNo);
// //       if (isNaN(semNo)) {
// //          return res.status(400).json({ error: "Invalid semester number." });
// //       }

// //       // Find subjects matching department and semesterNo
// //       const subjects = await Subject.find({
// //          department: mongoose.Types.ObjectId(department),
// //          semesterNo: semNo,
// //       });

// //       if (!subjects.length) {
// //          return res.status(404).json({ error: "No subjects found." });
// //       }

// //       return res.status(200).json(subjects);
// //    } catch (err) {
// //       console.error("Error fetching subjects:", err);
// //       return res.status(500).json({ error: "Internal server error." });
// //    }
// // }

// export const getSubjectCount = async (req, res) => {
//    try {
//       const count = await Subject.countDocuments();
//       res.status(200).json({ totalSubjects: count });
//    } catch (error) {
//       console.error("Error getting subject count:", error);
//       res.status(500).json({ error: "Failed to get subject count" });
//    }
// };
import mongoose from "mongoose";
import Subject from "../models/subject.model.js";

// Helper to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Add new subject (Teacher only)
export const addSubject = async (req, res) => {
   try {
      const {
         subjectName,
         subjectCode,
         subjectCredit,
         semesterNo,
         department,
      } = req.body;

      if (!subjectName || !subjectCode || !semesterNo || !department) {
         return res.status(400).json({ error: "All fields are required." });
      }

      if (!isValidObjectId(department)) {
         return res.status(400).json({ error: "Invalid department ID." });
      }

      const newSubject = new Subject({
         subjectName,
         subjectCode,
         subjectCredit,
         semesterNo,
         department,
      });

      const savedSubject = await newSubject.save();
      return res.status(201).json(savedSubject);
   } catch (error) {
      console.error("Error adding subject:", error);
      return res.status(500).json({ error: "Internal server error." });
   }
};

// Update subject by ID (Teacher only)
export const updateSubject = async (req, res) => {
   try {
      const { id } = req.params;
      const updates = req.body;

      if (!isValidObjectId(id)) {
         return res.status(400).json({ error: "Invalid subject ID." });
      }

      if (updates.department && !isValidObjectId(updates.department)) {
         return res.status(400).json({ error: "Invalid department ID." });
      }

      const updatedSubject = await Subject.findByIdAndUpdate(id, updates, {
         new: true,
         runValidators: true,
      });

      if (!updatedSubject) {
         return res.status(404).json({ error: "Subject not found." });
      }

      return res.status(200).json(updatedSubject);
   } catch (error) {
      console.error("Error updating subject:", error);
      return res.status(500).json({ error: "Internal server error." });
   }
};

// Delete subject by ID (Teacher only)
export const deleteSubject = async (req, res) => {
   try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
         return res.status(400).json({ error: "Invalid subject ID." });
      }

      const deletedSubject = await Subject.findByIdAndDelete(id);

      if (!deletedSubject) {
         return res.status(404).json({ error: "Subject not found." });
      }

      return res.status(200).json({ message: "Subject deleted successfully." });
   } catch (error) {
      console.error("Error deleting subject:", error);
      return res.status(500).json({ error: "Internal server error." });
   }
};

// View single subject by ID (Teacher or Student)
export const getSubjectById = async (req, res) => {
   try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
         return res.status(400).json({ error: "Invalid subject ID." });
      }

      const subject = await Subject.findById(id).populate("department");

      if (!subject) {
         return res.status(404).json({ error: "Subject not found." });
      }

      return res.status(200).json(subject);
   } catch (error) {
      console.error("Error fetching subject:", error);
      return res.status(500).json({ error: "Internal server error." });
   }
};

export const getSubjectCount = async (req, res) => {
   try {
      const count = await Subject.countDocuments();
      res.status(200).json({ totalSubjects: count });
   } catch (error) {
      console.error("Error getting subject count:", error);
      res.status(500).json({ error: "Failed to get subject count" });
   }
};

export async function getSubjectsByDeptAndSemester(req, res) {
   const { department, semesterNo } = req.query;

   if (!department || !semesterNo) {
      return res
         .status(400)
         .json({ error: "Missing department or semesterNo parameter." });
   }

   try {
      const subjects = await Subject.find({
         department,
         semesterNo: Number(semesterNo),
      });

      if (!subjects || subjects.length === 0) {
         return res.status(404).json({ error: "No subjects found." });
      }

      res.status(200).json(subjects);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}
