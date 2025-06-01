// import express from "express";
// import {
//    addProject,
//    getProjectsByStudent,
//    updateProject,
//    deleteProject,
//    getProjectsByRoll,
// } from "../controllers/project.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { upload } from "../middlewares/multer.middleware.js";

// const router = express.Router();

// // Route to add a project (only accessible to logged-in students)
// // router.route("/addProject").post(
// //    upload.fields([
// //       {
// //          name: "projectAvatar", // Ensure this matches the form name on the frontend
// //          maxCount: 1,
// //       },
// //    ]),
// //    verifyJWT,
// //    addProject
// // );

// router.post(
//    "/addProject",
//    (req, res, next) => {
//       upload.single("projectAvatar")(req, res, function (err) {
//          if (err) {
//             return res.status(400).json({ message: err.message });
//          }
//          next();
//       });
//    },
//    verifyJWT,
//    addProject
// );

// // Route to get projects by student
// router.get("/student/:rollNumber", verifyJWT, getProjectsByStudent);

// // Route to update a project by ID
// router
//    .route("/updateProject/:projectId")
//    .put(upload.single("projectAvatar"), verifyJWT, updateProject);

// // Route to delete a project by ID

// router.delete("/deleteProject/:projectId", verifyJWT, deleteProject);

// // Route to view Projects as Teacher

// router.get("/viewProject/:rollNumber", verifyJWT, (req, res, next) => {
//    if (req.user.role !== "Teacher") {
//       return res.status(403).json({ message: "Access Denied: Teachers only" });
//    }
//    getProjectsByRoll(req, res, next);
// });

// export default router;

import express from "express";
import {
   addProject,
   getProjectsByStudent,
   updateProject,
   deleteProject,
   getProjectsByRoll,
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Add a project (students only)
router.post(
   "/addProject",
   (req, res, next) => {
      upload.single("projectAvatar")(req, res, function (err) {
         if (err) {
            return res.status(400).json({ message: err.message });
         }
         next();
      });
   },
   verifyJWT,
   addProject
);

// Get projects of the authenticated student
router.get("/student/me", verifyJWT, getProjectsByStudent);

// Update a project by ID
router.put(
   "/updateProject/:projectId",
   upload.single("projectAvatar"),
   verifyJWT,
   updateProject
);

// Delete a project by ID
router.delete("/deleteProject/:projectId", verifyJWT, deleteProject);

// Teacher views projects by student roll number
router.get("/viewProject/:rollNumber", verifyJWT, (req, res, next) => {
   if (req.user.role !== "Teacher") {
      return res.status(403).json({ message: "Access Denied: Teachers only" });
   }
   getProjectsByRoll(req, res, next);
});

export default router;
