import express from "express";
import {
   createCertificate,
   getCertificates,
   getCertificateById,
   updateCertificate,
   deleteCertificate,
} from "../controllers/certificate.controller.js";

const router = express.Router();

// Create new certificate
router.post("/", createCertificate);

// Get all certificates
router.get("/", getCertificates);

// Get certificate by ID
router.get("/:certificateId", getCertificateById);

// Update certificate details
router.put("/:certificateId", updateCertificate);

// Delete a certificate
router.delete("/:certificateId", deleteCertificate);

export default router;
