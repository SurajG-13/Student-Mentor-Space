import Attendance from "../models/attendance.model.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Add or update attendance records for a student in a subject
export const addOrUpdateAttendance = async (req, res) => {
   try {
      const {
         student,
         subject,
         currentSemester,
         department,
         attendanceRecords,
      } = req.body;

      // Basic validations
      if (
         !student ||
         !subject ||
         !currentSemester ||
         !department ||
         !attendanceRecords
      ) {
         return res.status(400).json({ error: "All fields are required." });
      }

      if (
         !isValidObjectId(student) ||
         !isValidObjectId(subject) ||
         !isValidObjectId(department)
      ) {
         return res.status(400).json({ error: "Invalid IDs provided." });
      }

      // Use currentSemester in your Attendance schema
      let attendance = await Attendance.findOne({
         student,
         subject,
         currentSemester,
      });

      if (attendance) {
         attendance.attendanceRecords = attendanceRecords;
      } else {
         attendance = new Attendance({
            student,
            subject,
            currentSemester,
            department,
            attendanceRecords,
         });
      }

      const savedAttendance = await attendance.save();
      res.status(200).json(savedAttendance);
   } catch (error) {
      console.error("Error adding/updating attendance:", error);
      res.status(500).json({ error: "Internal server error." });
   }
};

// Get attendance records for a student (teacher or student)
export const getAttendanceByStudent = async (req, res) => {
   try {
      const { studentId } = req.params;

      if (!isValidObjectId(studentId)) {
         return res.status(400).json({ error: "Invalid student ID." });
      }

      // If user is student, verify they can only access their own data (authorization middleware recommended)

      const attendanceRecords = await Attendance.find({ student: studentId })
         .populate("subject department")
         .exec();

      res.status(200).json(attendanceRecords);
   } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ error: "Internal server error." });
   }
};

// Delete attendance record by ID (teacher only)
export const deleteAttendance = async (req, res) => {
   try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
         return res.status(400).json({ error: "Invalid attendance ID." });
      }

      const deleted = await Attendance.findByIdAndDelete(id);

      if (!deleted) {
         return res.status(404).json({ error: "Attendance record not found." });
      }

      res.status(200).json({
         message: "Attendance record deleted successfully.",
      });
   } catch (error) {
      console.error("Error deleting attendance:", error);
      res.status(500).json({ error: "Internal server error." });
   }
};

export const getAttendanceBySubject = async (req, res) => {
   try {
      const { subject } = req.query;

      if (!subject || !mongoose.Types.ObjectId.isValid(subject)) {
         return res
            .status(400)
            .json({ error: "Invalid or missing subject ID." });
      }

      const attendanceRecords = await Attendance.find({ subject })
         .populate("student", "studentName")
         .exec();

      //   if (!attendanceRecords.length) {
      //      return res.status(404).json({ error: "No attendance records found." });
      //   }

      res.status(200).json(attendanceRecords);
   } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ error: "Internal server error." });
   }
};

export const getAttendanceWithPercentage = async (req, res) => {
   try {
      const { student, subject, currentSemester } = req.query;

      if (
         !student ||
         !subject ||
         !currentSemester ||
         !mongoose.Types.ObjectId.isValid(student) ||
         !mongoose.Types.ObjectId.isValid(subject)
      ) {
         return res
            .status(400)
            .json({ error: "Invalid or missing parameters." });
      }

      const attendanceDocs = await Attendance.find({
         student,
         subject,
         currentSemester: Number(currentSemester),
      });

      if (!attendanceDocs.length) {
         return res.status(200).json({
            attendanceRecords: [],
            totalClasses: 0,
            attendedClasses: 0,
            attendancePercentage: 0,
         });
      }

      // Combine all attendanceRecords from multiple docs (if any)
      let allRecords = [];
      attendanceDocs.forEach((doc) => {
         allRecords = allRecords.concat(doc.attendanceRecords);
      });

      // Remove duplicates by date (keep latest if duplicates exist)
      const uniqueRecordsMap = new Map();
      allRecords.forEach((rec) => {
         uniqueRecordsMap.set(rec.date.toISOString().slice(0, 10), rec.status);
      });

      const uniqueRecords = Array.from(uniqueRecordsMap.values());

      const totalClasses = uniqueRecords.length;
      const attendedClasses = uniqueRecords.filter(
         (status) => status === "present"
      ).length;
      const attendancePercentage =
         totalClasses === 0 ? 0 : (attendedClasses / totalClasses) * 100;

      res.status(200).json({
         attendanceRecords: Array.from(uniqueRecordsMap, ([date, status]) => ({
            date,
            status,
         })),
         totalClasses,
         attendedClasses,
         attendancePercentage: attendancePercentage.toFixed(2),
      });
   } catch (error) {
      console.error("Error fetching attendance with percentage:", error);
      res.status(500).json({ error: "Internal server error." });
   }
};
