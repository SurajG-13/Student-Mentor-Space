import { Marks } from "../models/mark.model.js"; // Import Marks model
import { Student } from "../models/student.model.js"; // Import Student model
import { Subject } from "../models/subject.model.js"; // Import Subject model

// Create new marks entry
export const createMarks = async (req, res) => {
   try {
      const { student, subject, creditObtained, gradeObtained, semester } =
         req.body;

      // Check if the student and subject exist
      const studentExists = await Student.findById(student);
      const subjectExists = await Subject.findById(subject);

      if (!studentExists || !subjectExists) {
         return res.status(400).json({ message: "Invalid student or subject" });
      }

      const newMarks = new Marks({
         student,
         subject,
         creditObtained,
         gradeObtained,
         semester,
      });

      await newMarks.save();

      // Update student's total marks and grade (optional)
      studentExists.totalMarks += creditObtained;
      studentExists.overallGrade = gradeObtained; // Simplified logic for grade
      await studentExists.save();

      res.status(201).json({ message: "Marks added successfully", newMarks });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get all marks entries
export const getMarks = async (req, res) => {
   try {
      const marks = await Marks.find().populate("student subject");
      res.status(200).json(marks);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get marks by student ID
export const getMarksByStudent = async (req, res) => {
   try {
      const { studentId } = req.params;

      const marks = await Marks.find({ student: studentId }).populate(
         "student subject"
      );
      if (!marks) {
         return res.status(404).json({ message: "Marks not found" });
      }

      res.status(200).json(marks);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update marks entry
export const updateMarks = async (req, res) => {
   try {
      const { marksId } = req.params;
      const { creditObtained, gradeObtained, semester } = req.body;

      const updatedMarks = await Marks.findByIdAndUpdate(
         marksId,
         { creditObtained, gradeObtained, semester },
         { new: true }
      );

      if (!updatedMarks) {
         return res.status(404).json({ message: "Marks entry not found" });
      }

      res.status(200).json(updatedMarks);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Delete marks entry
export const deleteMarks = async (req, res) => {
   try {
      const { marksId } = req.params;

      const deletedMarks = await Marks.findByIdAndDelete(marksId);
      if (!deletedMarks) {
         return res.status(404).json({ message: "Marks entry not found" });
      }

      res.status(200).json({ message: "Marks entry deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
