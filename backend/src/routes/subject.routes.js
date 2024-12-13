import express from "express";
import {
   createSubject,
   getSubjects,
   getSubjectById,
   updateSubject,
   deleteSubject,
} from "../controllers/subject.controller.js";

const router = express.Router();

// Create new subject
router.post("/", createSubject);

// Get all subjects
router.get("/", getSubjects);

// Get subject by ID
router.get("/:subjectId", getSubjectById);

// Update subject details
router.put("/:subjectId", updateSubject);

// Delete a subject
router.delete("/:subjectId", deleteSubject);

export default router;
