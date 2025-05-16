import express from "express";
import {
   addProject,
   getProjectsByStudent,
   updateProject,
   deleteProject,
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Route to add a project (only accessible to logged-in students)
// router.route("/addProject").post(
//    upload.fields([
//       {
//          name: "projectAvatar", // Ensure this matches the form name on the frontend
//          maxCount: 1,
//       },
//    ]),
//    verifyJWT,
//    addProject
// );

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

// Route to get projects by student
router.get("/student/:rollNumber", verifyJWT, getProjectsByStudent);

// Route to update a project by ID
router
   .route("/updateProject/:projectId")
   .put(upload.single("projectAvatar"), verifyJWT, updateProject);

// Route to delete a project by ID

router.delete("/deleteProject/:projectId", verifyJWT, deleteProject);

export default router;
