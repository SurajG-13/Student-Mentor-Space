import { Subject } from "../models/subject.model.js";
import { Department } from "../models/department.model.js";

// Create a new subject
export const createSubject = async (req, res) => {
   try {
      const {
         department,
         semester,
         subjectName,
         subjectCode,
         UPID,
         totalCredit,
      } = req.body;

      // Check if department exists
      const departmentExists = await Department.findById(department);
      if (!departmentExists) {
         return res.status(400).json({ message: "Department not found" });
      }

      const newSubject = new Subject({
         department,
         semester,
         subjectName,
         subjectCode,
         UPID,
         totalCredit,
      });

      await newSubject.save();

      res.status(201).json({
         message: "Subject created successfully",
         newSubject,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get all subjects
export const getSubjects = async (req, res) => {
   try {
      const subjects = await Subject.find().populate("department");
      res.status(200).json(subjects);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get a subject by ID
export const getSubjectById = async (req, res) => {
   try {
      const { subjectId } = req.params;

      const subject = await Subject.findById(subjectId).populate("department");
      if (!subject) {
         return res.status(404).json({ message: "Subject not found" });
      }

      res.status(200).json(subject);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update subject details
export const updateSubject = async (req, res) => {
   try {
      const { subjectId } = req.params;
      const {
         department,
         semester,
         subjectName,
         subjectCode,
         UPID,
         totalCredit,
      } = req.body;

      const updatedSubject = await Subject.findByIdAndUpdate(
         subjectId,
         { department, semester, subjectName, subjectCode, UPID, totalCredit },
         { new: true }
      );

      if (!updatedSubject) {
         return res.status(404).json({ message: "Subject not found" });
      }

      res.status(200).json(updatedSubject);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Delete a subject
export const deleteSubject = async (req, res) => {
   try {
      const { subjectId } = req.params;

      const deletedSubject = await Subject.findByIdAndDelete(subjectId);
      if (!deletedSubject) {
         return res.status(404).json({ message: "Subject not found" });
      }

      res.status(200).json({ message: "Subject deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
