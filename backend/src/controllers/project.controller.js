import { Project } from "../models/project.model.js";
import { Student } from "../models/student.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Add Project
export const addProject = asyncHandler(async (req, res) => {
   const {
      projectName,
      projectDomain,
      projectStack,
      projectAvatar,
      projectBio,
      projectLink,
      projectMentor,
      projectMembers,
   } = req.body;

   // Ensure user is authenticated and is a student
   if (!req.user) {
      throw new ApiError(401, "Unauthorized - No user found.");
   }

   const student = req.user; // Already attached in the verifyJWT middleware

   if (student.role !== "Student") {
      throw new ApiError(401, "Unauthorized - User is not a student.");
   }

   let projectAvatarUrl = null;

   if (req.file) {
      const avatarLocalPath = req.file.path;
      try {
         const avatar = await uploadonCloudinary(avatarLocalPath);
         if (!avatar) {
            throw new ApiError(400, "Avatar Upload Failed!");
         }
         projectAvatarUrl = avatar.url; // Cloudinary URL
      } catch (error) {
         throw new ApiError(400, "Avatar Upload Failed!");
      }
   }

   // let projectAvatarUrl = null;

   // if (req.files?.avatar) {
   //    const avatarLocalPath = req.files.avatar[0]?.path;

   //    if (!avatarLocalPath) {
   //       throw new ApiError(400, "Avatar Missing!");
   //    }

   //    const avatar = await uploadonCloudinary(avatarLocalPath);

   //    if (!avatar) {
   //       throw new ApiError(400, "Avatar Upload Failed!");
   //    }

   //    projectAvatarUrl = avatar.url;
   // }

   const newProject = new Project({
      projectName,
      projectDomain,
      projectStack,
      projectAvatar: projectAvatarUrl,
      projectBio,
      projectLink,
      projectMentor,
      projectMembers,
   });

   // Save the project
   await newProject.save();

   // Ensure student.projects is initialized as an array
   if (!student.projects) {
      student.projects = []; // Initialize if undefined
   }

   // Add project to the student's list of projects
   student.projects.push(newProject._id);
   await student.save();

   return res.status(201).json({
      success: true,
      data: newProject,
      message: "Project added successfully!",
   });
});

// Get Projects by Student (Authenticated Student Only)

// Fetch all projects of a student by their roll number
export const getProjectsByStudent = asyncHandler(async (req, res) => {
   // Extract the student roll number from the authenticated user
   const student = req.user; // req.user is already populated by the verifyJWT middleware

   if (!student || student.role !== "Student") {
      throw new ApiError(401, "Unauthorized - User is not a student.");
   }

   // Fetch all the projects of this student (populating the 'projects' field)
   const studentWithProjects = await Student.findById(student._id).populate(
      "projects"
   );

   if (!studentWithProjects) {
      throw new ApiError(404, "Student not found.");
   }

   return res.status(200).json({
      success: true,
      data: studentWithProjects.projects, // Return the list of projects
   });
});

// Update Project by ID

// Controller to update a project
export const updateProject = async (req, res) => {
   const { projectId } = req.params;
   const updatedData = req.body;

   try {
      // Find the project by ID and update it
      const updatedProject = await Project.findByIdAndUpdate(
         projectId,
         updatedData,
         {
            new: true, // Return the updated document
            runValidators: true, // Apply validation rules during update
         }
      );

      if (!updatedProject) {
         return res.status(404).json({ message: "Project not found" });
      }

      // Return the updated project as response
      res.status(200).json({ data: updatedProject });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
   }
};

// Delete Project by ID

export const deleteProject = async (req, res) => {
   const { projectId } = req.params;

   try {
      // Find the project by ID and delete it
      const deletedProject = await Project.findByIdAndDelete(projectId);

      if (!deletedProject) {
         return res.status(404).json({ message: "Project not found" });
      } // Return a success message or the deleted project

      res.status(200).json({
         message: "Project deleted successfully",
         data: deletedProject,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
   }
};
