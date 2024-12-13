import express from "express";
import {
   createMarks,
   getMarks,
   getMarksByStudent,
   updateMarks,
   deleteMarks,
} from "../controllers/marks.controller.js";

const router = express.Router();

// Create new marks entry
router.post("/", createMarks);

// Get all marks
router.get("/", getMarks);

// Get marks by student ID
router.get("/:studentId", getMarksByStudent);

// Update marks entry
router.put("/:marksId", updateMarks);

// Delete marks entry
router.delete("/:marksId", deleteMarks);

export default router;
