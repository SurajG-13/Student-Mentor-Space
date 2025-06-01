// import express from "express";
// import {
//    createCertificate,
//    getCertificates,
//    getCertificateById,
//    getCertificatesByStudent,
//    updateCertificate,
//    deleteCertificate,
// } from "../controllers/certificate.controller.js";

// import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { upload } from "../middlewares/multer.middleware.js";

// const router = express.Router();

// // Route to create a new certificate with file upload
// router.post(
//    "/",
//    (req, res, next) => {
//       upload.single("certificateFile")(req, res, function (err) {
//          if (err) {
//             return res.status(400).json({ message: err.message });
//          }
//          next();
//       });
//    },
//    verifyJWT,
//    createCertificate
// );

// // Get all certificates (secured)
// router.get("/", verifyJWT, getCertificates);

// // Get certificate by ID (secured)
// router.get("/:certificateId", verifyJWT, getCertificateById);
// router.get("/student/:rollNumber", verifyJWT, getCertificatesByStudent);

// // Update certificate with optional file update
// router.put(
//    "/:certificateId",
//    (req, res, next) => {
//       upload.single("certificateFile")(req, res, function (err) {
//          if (err) {
//             return res.status(400).json({ message: err.message });
//          }
//          next();
//       });
//    },
//    verifyJWT,
//    updateCertificate
// );

// // Delete a certificate (secured)
// router.delete("/:certificateId", verifyJWT, deleteCertificate);

// export default router;

import express from "express";
import {
   createCertificate,
   getCertificates,
   getCertificateById,
   getCertificatesByStudent,
   updateCertificate,
   deleteCertificate,
} from "../controllers/certificate.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Route to create a new certificate with file upload
router.post(
   "/",
   (req, res, next) => {
      upload.single("certificateFile")(req, res, function (err) {
         if (err) {
            return res.status(400).json({ message: err.message });
         }
         next();
      });
   },
   verifyJWT,
   createCertificate
);

// Get all certificates (secured)
router.get("/", verifyJWT, getCertificates);

// Get certificates by student roll number (specific route - must come before :certificateId)
router.get("/student/:rollNumber", verifyJWT, getCertificatesByStudent);

// Get certificate by ID (generic route)
router.get("/:certificateId", verifyJWT, getCertificateById);

// Update certificate with optional file update
router.put(
   "/:certificateId",
   (req, res, next) => {
      upload.single("certificateFile")(req, res, function (err) {
         if (err) {
            return res.status(400).json({ message: err.message });
         }
         next();
      });
   },
   verifyJWT,
   updateCertificate
);

// Delete a certificate (secured)
router.delete("/:certificateId", verifyJWT, deleteCertificate);

export default router;
