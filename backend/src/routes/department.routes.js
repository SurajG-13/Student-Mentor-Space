import express from "express";
import {
   createDepartment,
   getDepartments,
   getDepartmentById,
   updateDepartment,
   deleteDepartment,
} from "../controllers/department.controller.js";

const router = express.Router();

// Create a new department
router.post("/", createDepartment);

// Get all departments
router.get("/", getDepartments);

// Get department by ID
router.get("/:departmentId", getDepartmentById);

// Update department details
router.put("/:departmentId", updateDepartment);

// Delete a department
router.delete("/:departmentId", deleteDepartment);

export default router;
