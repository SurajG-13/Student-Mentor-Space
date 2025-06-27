import express from "express";
import {
   getLabSubjectsByDeptAndSemester,
   getLabSubjectCount,
   addLabSubject,
   updateLabSubject,
   deleteLabSubject,
   getLabSubjectById,
} from "../controllers/labSubject.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/subjects?department=...&semesterNo=...
 * @desc    Get subjects for a given department and semester
 * @access  Protected (Student or Teacher)
 */
router.get("/", verifyJWT, getLabSubjectsByDeptAndSemester);

/**
 * @route   GET /api/count
 * @desc    Get all the subjects in the database
 * @access  All
 */
router.get("/count", getLabSubjectCount);

/**
 * @route   POST /api/subjects
 * @desc    Add new subject
 * @access  Protected (Teacher only)
 */
router.post("/", verifyJWT, addLabSubject);

/**
 * @route   PUT /api/subjects/:id
 * @desc    Update subject by ID
 * @access  Protected (Teacher only)
 */
router.put("/:id", verifyJWT, updateLabSubject);

/**
 * @route   DELETE /api/subjects/:id
 * @desc    Delete subject by ID
 * @access  Protected (Teacher only)
 */
router.delete("/:id", verifyJWT, deleteLabSubject);

/**
 * @route   GET /api/subjects/:id
 * @desc    Get subject by ID
 * @access  Protected (Student or Teacher)
 */
router.get("/:id", verifyJWT, getLabSubjectById);

export default router;
