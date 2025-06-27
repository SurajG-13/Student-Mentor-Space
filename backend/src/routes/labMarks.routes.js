import express from "express";
import {
   saveOrUpdateLabMarks,
   getStudentLabMarks,
   getLabMarksByRoll,
} from "../controllers/labMarks.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/marks
 * @desc    Student submits or updates marks
 */
router.post("/", verifyJWT, (req, res, next) => {
   if (req.user.role !== "Student") {
      return res.status(403).json({ message: "Access Denied: Students only" });
   }
   saveOrUpdateLabMarks(req, res, next);
});

/**
 * @route   GET /api/marks/me
 * @desc    Student views own marks
 */
router.get("/me", verifyJWT, (req, res, next) => {
   if (req.user.role !== "Student") {
      return res.status(403).json({ message: "Access Denied: Students only" });
   }
   getStudentLabMarks(req, res, next);
});

/**
 * @route   GET /api/marks/:rollNumber
 * @desc    Teacher views a student's marks by roll number
 */
router.get("/:rollNumber", verifyJWT, (req, res, next) => {
   if (req.user.role !== "Teacher") {
      return res.status(403).json({ message: "Access Denied: Teachers only" });
   }
   getLabMarksByRoll(req, res, next);
});

export default router;
