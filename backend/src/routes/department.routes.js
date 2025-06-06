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

// import express from "express";
// import {
//    createDepartment,
//    getDepartments,
//    getDepartmentById,
//    updateDepartment,
//    deleteDepartment,
//    getDepartmentCount,
// } from "../controllers/department.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = express.Router();

// /**
//  * @route   GET /api/count
//  * @desc    Get all the departments in the database
//  * @access  All
//  */
// router.get("/count", getDepartmentCount);

// // Protect create, update and delete routes with verifyJWT
// router.post("/", verifyJWT, createDepartment);
// router.get("/getDepartments", getDepartments);
// router.get("/:departmentId", getDepartmentById);
// // router.put("/:departmentId", verifyJWT, updateDepartment);
// // router.delete("/:departmentId", verifyJWT, deleteDepartment);

// export default router;

import express from "express";
import {
   createDepartment,
   getDepartments,
   getDepartmentById,
   updateDepartment,
   deleteDepartment,
   getDepartmentCount,
} from "../controllers/department.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/departments/count
 * @desc    Get total number of departments
 * @access  Public
 */
router.get("/count", getDepartmentCount);

/**
 * @route   GET /api/departments
 * @desc    Get all departments
 * @access  Public
 */
router.get("/", getDepartments);

/**
 * @route   GET /api/departments/:departmentId
 * @desc    Get a department by ID
 * @access  Public
 */
router.get("/:departmentId", getDepartmentById);

/**
 * @route   POST /api/departments
 * @desc    Create a new department
 * @access  Protected (authenticated users)
 */
router.post("/", verifyJWT, createDepartment);

/**
 * @route   PUT /api/departments/:departmentId
 * @desc    Update a department by ID
 * @access  Protected (authenticated users)
 */
router.put("/:departmentId", verifyJWT, updateDepartment);

/**
 * @route   DELETE /api/departments/:departmentId
 * @desc    Delete a department by ID
 * @access  Protected (authenticated users)
 */
router.delete("/:departmentId", verifyJWT, deleteDepartment);

export default router;
