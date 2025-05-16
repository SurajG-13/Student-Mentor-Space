// import express from "express";
// import {
//    createDepartment,
//    getDepartments,
//    getDepartmentById,
//    updateDepartment,
//    deleteDepartment,
// } from "../controllers/department.controller.js";

// const router = express.Router();

// // Create a new department
// router.post("/", createDepartment);

// // Get all departments
// router.get("/", getDepartments);

// // Get department by ID
// router.get("/:departmentId", getDepartmentById);

// // Update department details
// router.put("/:departmentId", updateDepartment);

// // Delete a department
// router.delete("/:departmentId", deleteDepartment);

// export default router;

import express from "express";
import {
   createDepartment,
   getDepartments,
   getDepartmentById,
   updateDepartment,
   deleteDepartment,
} from "../controllers/department.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protect create, update and delete routes with verifyJWT
router.post("/", verifyJWT, createDepartment);
router.get("/", getDepartments);
router.get("/:departmentId", getDepartmentById);
router.put("/:departmentId", verifyJWT, updateDepartment);
router.delete("/:departmentId", verifyJWT, deleteDepartment);

export default router;
