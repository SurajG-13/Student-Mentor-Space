import express from "express";
import {
   addOrUpdateAttendance,
   getAttendanceByStudent,
   deleteAttendance,
   getAttendanceBySubject,
   getAttendanceWithPercentage,
} from "../controllers/attendance.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/attendance
 * @desc    Add or update attendance records (Teacher only)
 * @access  Protected (Teacher)
 */
router.post("/", verifyJWT, addOrUpdateAttendance);

router.get("/", verifyJWT, getAttendanceBySubject);

/**
 * @route   GET /api/attendance/student/:studentId
 * @desc    Get attendance records for a student (Teacher or Student)
 * @access  Protected
 */
router.get("/student/:studentId", verifyJWT, getAttendanceByStudent);

/**
 * @route   DELETE /api/attendance/:id
 * @desc    Delete attendance record by ID (Teacher only)
 * @access  Protected (Teacher)
 */
router.delete("/:id", verifyJWT, deleteAttendance);

router.get("/", verifyJWT, getAttendanceWithPercentage); // Use query params student, subject, currentSemester

export default router;
