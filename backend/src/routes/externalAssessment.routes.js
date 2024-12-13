import express from "express";
import {
   createExternalAssessment,
   getExternalAssessments,
   getExternalAssessmentById,
   updateExternalAssessment,
   deleteExternalAssessment,
} from "../controllers/externalAssessment.controller.js";

const router = express.Router();

// Create new external assessment entry
router.post("/", createExternalAssessment);

// Get all external assessments
router.get("/", getExternalAssessments);

// Get external assessment by ID
router.get("/:assessmentId", getExternalAssessmentById);

// Update external assessment
router.put("/:assessmentId", updateExternalAssessment);

// Delete external assessment entry
router.delete("/:assessmentId", deleteExternalAssessment);

export default router;
