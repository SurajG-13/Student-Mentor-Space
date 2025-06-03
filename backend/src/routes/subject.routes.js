// import express from "express";
// import { getSubjectsByDeptAndSemester } from "../controllers/subject.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
// const router = express.Router();

// /**
//  * @route   GET /api/subjects?department=...&semesterNo=...
//  * @desc    Get subjects for a given department and semester
//  */
// router.get("/", getSubjectsByDeptAndSemester);

// export default router;

import express from "express";
import {
   getSubjectsByDeptAndSemester,
   getSubjectCount,
   addSubject,
   updateSubject,
   deleteSubject,
   getSubjectById,
} from "../controllers/subject.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/subjects?department=...&semesterNo=...
 * @desc    Get subjects for a given department and semester
 * @access  Protected (Student or Teacher)
 */
router.get("/", verifyJWT, getSubjectsByDeptAndSemester);

/**
 * @route   GET /api/count
 * @desc    Get all the subjects in the database
 * @access  All
 */
router.get("/count", getSubjectCount);

// Middleware to check if user is Teacher
// const verifyTeacher = (req, res, next) => {
//    if (req.user?.role !== "teacher") {
//       return res.status(403).json({ error: "Access denied. Teachers only." });
//    }
//    next();
// };

// /**
//  * @route   GET /api/subjects?department=...&semesterNo=...
//  * @desc    Get subjects for a given department and semester
//  * @access  Protected (Student or Teacher)
//  */
// router.get("/", verifyJWT, getSubjectsByDeptAndSemester);

// /**
//  * @route   GET /api/subjects/count
//  * @desc    Get total subjects count
//  * @access  Public
//  */
// router.get("/count", getSubjectCount);

/**
 * @route   POST /api/subjects
 * @desc    Add new subject
 * @access  Protected (Teacher only)
 */
router.post("/", verifyJWT, addSubject);

/**
 * @route   PUT /api/subjects/:id
 * @desc    Update subject by ID
 * @access  Protected (Teacher only)
 */
router.put("/:id", verifyJWT, updateSubject);

/**
 * @route   DELETE /api/subjects/:id
 * @desc    Delete subject by ID
 * @access  Protected (Teacher only)
 */
router.delete("/:id", verifyJWT, deleteSubject);

/**
 * @route   GET /api/subjects/:id
 * @desc    Get subject by ID
 * @access  Protected (Student or Teacher)
 */
router.get("/:id", verifyJWT, getSubjectById);

export default router;
