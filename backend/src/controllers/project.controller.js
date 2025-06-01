// import { Project } from "../models/project.model.js";
// import { Student } from "../models/student.model.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { uploadonCloudinary } from "../utils/cloudinary.js";
// import mongoose from "mongoose";

// // Add Project
// export const addProject = asyncHandler(async (req, res) => {
//    const {
//       projectName,
//       projectDomain,
//       projectStack,
//       projectAvatar,
//       projectBio,
//       projectLink,
//       projectMentor,
//       projectMembers,
//    } = req.body;

//    // Ensure user is authenticated and is a student
//    if (!req.user) {
//       throw new ApiError(401, "Unauthorized - No user found.");
//    }

//    const student = req.user; // Already attached in the verifyJWT middleware

//    if (student.role !== "Student") {
//       throw new ApiError(401, "Unauthorized - User is not a student.");
//    }

//    let projectAvatarUrl = null;

//    if (req.file) {
//       const avatarLocalPath = req.file.path;
//       try {
//          const avatar = await uploadonCloudinary(avatarLocalPath);
//          if (!avatar) {
//             throw new ApiError(400, "Avatar Upload Failed!");
//          }
//          projectAvatarUrl = avatar.url; // Cloudinary URL
//       } catch (error) {
//          throw new ApiError(400, "Avatar Upload Failed!");
//       }
//    }

//    // let projectAvatarUrl = null;

//    // if (req.files?.avatar) {
//    //    const avatarLocalPath = req.files.avatar[0]?.path;

//    //    if (!avatarLocalPath) {
//    //       throw new ApiError(400, "Avatar Missing!");
//    //    }

//    //    const avatar = await uploadonCloudinary(avatarLocalPath);

//    //    if (!avatar) {
//    //       throw new ApiError(400, "Avatar Upload Failed!");
//    //    }

//    //    projectAvatarUrl = avatar.url;
//    // }

//    const newProject = new Project({
//       projectName,
//       projectDomain,
//       projectStack,
//       projectAvatar: projectAvatarUrl,
//       projectBio,
//       projectLink,
//       projectMentor,
//       projectMembers,
//    });

//    // Save the project
//    await newProject.save();

//    // Ensure student.projects is initialized as an array
//    if (!student.projects) {
//       student.projects = []; // Initialize if undefined
//    }

//    // Add project to the student's list of projects
//    student.projects.push(newProject._id);
//    await student.save();

//    return res.status(201).json({
//       success: true,
//       data: newProject,
//       message: "Project added successfully!",
//    });
// });

// // Get Projects by Student (Authenticated Student Only)

// // Fetch all projects of a student by their roll number
// export const getProjectsByStudent = asyncHandler(async (req, res) => {
//    // Extract the student roll number from the authenticated user
//    const student = req.user; // req.user is already populated by the verifyJWT middleware

//    if (!student || student.role !== "Student") {
//       throw new ApiError(401, "Unauthorized - User is not a student.");
//    }

//    // Fetch all the projects of this student (populating the 'projects' field)
//    const studentWithProjects = await Student.findById(student._id).populate(
//       "projects"
//    );

//    if (!studentWithProjects) {
//       throw new ApiError(404, "Student not found.");
//    }

//    return res.status(200).json({
//       success: true,
//       data: studentWithProjects.projects, // Return the list of projects
//    });
// });

// // Update Project by ID

// // Controller to update a project
// export const updateProject = async (req, res) => {
//    const { projectId } = req.params;
//    const updatedData = req.body;

//    try {
//       // Find the project by ID and update it
//       const updatedProject = await Project.findByIdAndUpdate(
//          projectId,
//          updatedData,
//          {
//             new: true, // Return the updated document
//             runValidators: true, // Apply validation rules during update
//          }
//       );

//       if (!updatedProject) {
//          return res.status(404).json({ message: "Project not found" });
//       }

//       // Return the updated project as response
//       res.status(200).json({ data: updatedProject });
//    } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//    }
// };

// // Delete Project by ID

// export const deleteProject = async (req, res) => {
//    const { projectId } = req.params;

//    try {
//       // Find the project by ID and delete it
//       const deletedProject = await Project.findByIdAndDelete(projectId);

//       if (!deletedProject) {
//          return res.status(404).json({ message: "Project not found" });
//       } // Return a success message or the deleted project

//       res.status(200).json({
//          message: "Project deleted successfully",
//          data: deletedProject,
//       });
//    } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//    }
// };

// // export async function getProjectsByRoll(req, res) {
// //    try {
// //       const { rollNumber } = req.params;
// //       // const project = await Project.findOne({ rollNumber }); // 🟢 corrected
// //       const project = await Project.find({ rollNumber });

// //       if (!project)
// //          return res.status(404).json({ error: "No projects found." });

// //       res.status(200).json({ data: project }); // wrap in `data` if your frontend expects that
// //    } catch (err) {
// //       res.status(500).json({ error: err.message });
// //    }
// // }

// export const getProjectsByRoll = asyncHandler(async (req, res) => {
//    const { rollNumber } = req.params;
//    console.log("Received rollNumber:", rollNumber);

//    const student = await Student.findOne({ rollNumber });
//    console.log("Found student:", student);

//    if (!student) {
//       return res.status(404).json({ error: "Student not found." });
//    }

//    const projects = await Project.find({ studentId: student._id });
//    console.log(`Found ${projects.length} projects for studentId:`, student._id);

//    if (!projects.length) {
//       return res.status(404).json({ error: "No projects found." });
//    }

//    res.status(200).json({ data: projects });
// });

import { Project } from "../models/project.model.js";
import { Student } from "../models/student.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";

// Add Project
export const addProject = asyncHandler(async (req, res) => {
   const {
      projectName,
      projectDomain,
      projectStack,
      projectBio,
      projectLink,
      projectMentor,
      projectMembers,
   } = req.body;

   if (!req.user) {
      throw new ApiError(401, "Unauthorized - No user found.");
   }

   const student = req.user;

   if (student.role !== "Student") {
      throw new ApiError(401, "Unauthorized - User is not a student.");
   }

   let projectAvatarUrl = null;

   if (req.file) {
      try {
         const avatar = await uploadonCloudinary(req.file.path);
         if (!avatar) {
            throw new ApiError(400, "Avatar Upload Failed!");
         }
         projectAvatarUrl = avatar.url;
      } catch (error) {
         throw new ApiError(400, "Avatar Upload Failed!");
      }
   }

   const newProject = new Project({
      projectName,
      projectDomain,
      projectStack,
      projectAvatar: projectAvatarUrl,
      projectBio,
      projectLink,
      projectMentor,
      projectMembers,
      department: student.department,
      studentId: student._id, // IMPORTANT: set studentId here
   });

   await newProject.save();

   // Optionally, add project ID to student.projects array (if you keep this field)
   // But keep in mind you must keep it in sync on update/delete
   // const updatedStudent = await Student.findByIdAndUpdate(
   //   student._id,
   //   { $push: { projects: newProject._id } },
   //   { new: true }
   // );

   res.status(201).json({
      success: true,
      data: newProject,
      message: "Project added successfully!",
   });
});

// Get Projects for Authenticated Student
export const getProjectsByStudent = asyncHandler(async (req, res) => {
   const student = req.user;

   if (!student || student.role !== "Student") {
      throw new ApiError(401, "Unauthorized - User is not a student.");
   }

   const projects = await Project.find({ studentId: student._id });

   res.status(200).json({
      success: true,
      data: projects,
   });
});

// Update Project by ID
export const updateProject = asyncHandler(async (req, res) => {
   const { projectId } = req.params;
   const updatedData = req.body;

   // If avatar file uploaded, handle it here (optional)
   if (req.file) {
      try {
         const avatar = await uploadonCloudinary(req.file.path);
         if (!avatar) {
            throw new ApiError(400, "Avatar Upload Failed!");
         }
         updatedData.projectAvatar = avatar.url;
      } catch (error) {
         throw new ApiError(400, "Avatar Upload Failed!");
      }
   }

   const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updatedData,
      { new: true, runValidators: true }
   );

   if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
   }

   res.status(200).json({ data: updatedProject });
});

// Delete Project by ID
export const deleteProject = asyncHandler(async (req, res) => {
   const { projectId } = req.params;

   const deletedProject = await Project.findByIdAndDelete(projectId);

   if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
   }

   res.status(200).json({
      message: "Project deleted successfully",
      data: deletedProject,
   });
});

// Get Projects by Student Roll Number (for teacher/admin)
export const getProjectsByRoll = asyncHandler(async (req, res) => {
   const { rollNumber } = req.params;

   const student = await Student.findOne({ rollNumber });

   if (!student) {
      return res.status(404).json({ error: "Student not found." });
   }

   const projects = await Project.find({ studentId: student._id });

   if (!projects.length) {
      return res.status(404).json({ error: "No projects found." });
   }

   res.status(200).json({ data: projects });
});
