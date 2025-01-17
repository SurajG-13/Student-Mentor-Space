import { Department } from "../models/department.model.js"; // Import Department model

// Create a new department
export const createDepartment = async (req, res) => {
   try {
      const { departmentID, departmentName } = req.body;

      // Check if department already exists
      const existingDepartment = await Department.findOne({ departmentName });
      if (existingDepartment) {
         return res.status(400).json({ message: "Department already exists" });
      }

      const newDepartment = new Department({
         departmentID,
         departmentName,
      });

      await newDepartment.save();

      res.status(201).json({
         message: "Department created successfully",
         newDepartment,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get all departments
export const getDepartments = async (req, res) => {
   try {
      const departments = await Department.find();
      res.status(200).json(departments);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get a department by ID
export const getDepartmentById = async (req, res) => {
   try {
      const { departmentId } = req.params;

      const department = await Department.findById(departmentId);
      if (!department) {
         return res.status(404).json({ message: "Department not found" });
      }

      res.status(200).json(department);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update department details
export const updateDepartment = async (req, res) => {
   try {
      const { departmentId } = req.params;
      const { departmentID, departmentName } = req.body;

      const updatedDepartment = await Department.findByIdAndUpdate(
         departmentId,
         { departmentID, departmentName },
         { new: true }
      );

      if (!updatedDepartment) {
         return res.status(404).json({ message: "Department not found" });
      }

      res.status(200).json(updatedDepartment);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
   try {
      const { departmentId } = req.params;

      const deletedDepartment =
         await Department.findByIdAndDelete(departmentId);
      if (!deletedDepartment) {
         return res.status(404).json({ message: "Department not found" });
      }

      res.status(200).json({ message: "Department deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// // controllers/departmentController.js
// const Department = require('../models/Department');

// // Create a new department
// exports.createDepartment = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const newDepartment = new Department({ name, description });
//     await newDepartment.save();
//     res.status(201).json(newDepartment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all departments
// exports.getAllDepartments = async (req, res) => {
//   try {
//     const departments = await Department.find();
//     res.status(200).json(departments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get department by ID
// exports.getDepartmentById = async (req, res) => {
//   try {
//     const department = await Department.findById(req.params.id);
//     if (!department) {
//       return res.status(404).json({ message: 'Department not found' });
//     }
//     res.status(200).json(department);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
