import express from "express";
import { getSubjectsByDeptAndSemester } from "../controllers/subject.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

/**
 * @route   GET /api/subjects?department=...&semesterNo=...
 * @desc    Get subjects for a given department and semester
 */
router.get("/", getSubjectsByDeptAndSemester);

export default router;
