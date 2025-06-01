// import { Router } from "express";
// import {
//    registerStudent,
//    loginStudent,
//    updateStudent,
//    getStudent,
//    //    logoutTeacher,
//    //    refreshAccessToken,
// } from "../controllers/student.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = Router();

// router.route("/register").post(
//    upload.single({
//       name: "StudentAvatar", // Must have same name in front-end
//       maxCount: 1,
//    }),

//    registerStudent
// );

// router.route("/login").post(loginStudent);
// router.put("/update/:rollNumber", updateStudent);
// router.route("/profile/:rollNumber").get(getStudent);

// // Secured Routes

// // router.route("/logout").post(verifyJWT, logoutStudent);

// // router.route("/refresh-token").post(refreshAccessToken);

// export default router;

import { Router } from "express";
import {
   registerStudent,
   loginStudent,
   updateStudent,
   getStudent,
   getLoggedInStudentProfile,
   logoutStudent,
   getStudentCount,
} from "../controllers/student.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// Fixed upload.single usage: pass string field name, not object
router.route("/register").post(
   upload.single("StudentAvatar"), // <-- fixed here
   registerStudent
);

router.route("/login").post(loginStudent);

// Protect update and profile routes with verifyJWT
router.put("/update/:rollNumber", updateStudent);
router.route("/profile/:rollNumber").get(getStudent);

// New route to get logged-in student's profile
router.get("/me", verifyJWT, getLoggedInStudentProfile);
router.post("/logout", verifyJWT, logoutStudent);
// Uncomment and implement logout and refresh token routes as needed
// router.route("/logout").post(verifyJWT, logoutStudent);
// router.route("/refresh-token").post(refreshAccessToken);

router.get("/count", getStudentCount);

export default router;
