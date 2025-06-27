import mongoose from "mongoose";
import LabSubject from "../models/labSubject.model.js";

// Helper to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Add new subject (Teacher only)
export const addLabSubject = async (req, res) => {
   try {
      const {
         labSubjectName,
         labSubjectCode,
         labSubjectCredit,
         semesterNo,
         department,
      } = req.body;

      if (!labSubjectName || !labSubjectCode || !semesterNo || !department) {
         return res.status(400).json({ error: "All fields are required." });
      }

      if (!isValidObjectId(department)) {
         return res.status(400).json({ error: "Invalid department ID." });
      }

      const newSubject = new LabSubject({
         labSubjectName,
         labSubjectCode,
         labSubjectCredit,
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
export const updateLabSubject = async (req, res) => {
   try {
      const { id } = req.params;
      const updates = req.body;

      if (!isValidObjectId(id)) {
         return res.status(400).json({ error: "Invalid subject ID." });
      }

      if (updates.department && !isValidObjectId(updates.department)) {
         return res.status(400).json({ error: "Invalid department ID." });
      }

      const updatedLabSubject = await LabSubject.findByIdAndUpdate(
         id,
         updates,
         {
            new: true,
            runValidators: true,
         }
      );

      if (!updatedLabSubject) {
         return res.status(404).json({ error: "Subject not found." });
      }

      return res.status(200).json(updatedLabSubject);
   } catch (error) {
      console.error("Error updating subject:", error);
      return res.status(500).json({ error: "Internal server error." });
   }
};

// Delete subject by ID (Teacher only)
export const deleteLabSubject = async (req, res) => {
   try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
         return res.status(400).json({ error: "Invalid Lab subject ID." });
      }

      const deletedLabSubject = await LabSubject.findByIdAndDelete(id);

      if (!deletedLabSubject) {
         return res.status(404).json({ error: "Lab Subject not found." });
      }

      return res
         .status(200)
         .json({ message: "Lab Subject deleted successfully." });
   } catch (error) {
      console.error("Error deleting subject:", error);
      return res.status(500).json({ error: "Internal server error." });
   }
};

// View single subject by ID (Teacher or Student)
export const getLabSubjectById = async (req, res) => {
   try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
         return res.status(400).json({ error: "Invalid subject ID." });
      }

      const labSubject = await LabSubject.findById(id).populate("department");

      if (!labSubject) {
         return res.status(404).json({ error: "Subject not found." });
      }

      return res.status(200).json(subject);
   } catch (error) {
      console.error("Error fetching subject:", error);
      return res.status(500).json({ error: "Internal server error." });
   }
};

export const getLabSubjectCount = async (req, res) => {
   try {
      const count = await LabSubject.countDocuments();
      res.status(200).json({ totalSubjects: count });
   } catch (error) {
      console.error("Error getting subject count:", error);
      res.status(500).json({ error: "Failed to get subject count" });
   }
};

export async function getLabSubjectsByDeptAndSemester(req, res) {
   const { department, semesterNo } = req.query;

   if (!department || !semesterNo) {
      return res
         .status(400)
         .json({ error: "Missing department or semesterNo parameter." });
   }

   try {
      const labSubjects = await LabSubject.find({
         department,
         semesterNo: Number(semesterNo),
      });

      if (!labSubjects || labSubjects.length === 0) {
         return res.status(404).json({ error: "No subjects found." });
      }

      res.status(200).json(labSubjects);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}
