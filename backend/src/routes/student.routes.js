import { Router } from "express";
import {
   registerStudent,
   loginStudent,
   updateStudent,
   getStudent,
   //    logoutTeacher,
   //    refreshAccessToken,
} from "../controllers/student.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
   upload.single({
      name: "StudentAvatar", // Must have same name in front-end
      maxCount: 1,
   }),

   registerStudent
);

router.route("/login").post(loginStudent);
router.put("/update/:rollNumber", updateStudent);
router.route("/profile/:rollNumber").get(getStudent);

// Secured Routes

// router.route("/logout").post(verifyJWT, logoutStudent);

// router.route("/refresh-token").post(refreshAccessToken);

export default router;
