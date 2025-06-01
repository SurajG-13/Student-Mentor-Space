import express from "express";
import {
   createInternship,
   getInternshipsForStudent,
   updateInternship,
   deleteInternship,
   getInternshipsByStudentRoll,
} from "../controllers/internship.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Student routes
router.post("/", verifyJWT, createInternship);
router.get("/", verifyJWT, getInternshipsForStudent);
router.put("/:internshipId", verifyJWT, updateInternship);
router.delete("/:internshipId", verifyJWT, deleteInternship);

// Teacher/Admin route
router.get("/student/:rollNumber", verifyJWT, getInternshipsByStudentRoll);

export default router;
