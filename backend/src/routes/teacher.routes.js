import { Router } from "express";
import {
   registerTeacher,
   loginTeacher,
   logoutTeacher,
   refreshAccessToken,
} from "../controllers/teacher.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
   upload.single({
      name: "avatar", // Must have same name in front-end
      maxCount: 1,
   }),

   registerTeacher
);

router.route("/login").post(loginTeacher);

// Secured Routes

router.route("/logout").post(verifyJWT, logoutTeacher);

router.route("/refresh-token").post(refreshAccessToken);

export default router;
