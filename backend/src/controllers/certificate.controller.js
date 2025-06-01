import { Certificate } from "../models/certificate.model.js";
import { Student } from "../models/student.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";

// Add Certificate
export const createCertificate = asyncHandler(async (req, res) => {
   const {
      certificateName,
      certificateCode,
      certificateIssuedBy,
      certificateDuration,
      certificatePoints,
      certificateLink,
   } = req.body;

   if (!req.user || req.user.role !== "Student") {
      throw new ApiError(401, "Unauthorized - User is not a student.");
   }

   const student = req.user;
   let certificateFileUrl = null;

   if (req.file) {
      const fileLocalPath = req.file.path;
      try {
         const uploaded = await uploadonCloudinary(fileLocalPath);
         if (!uploaded) {
            throw new ApiError(400, "File upload failed.");
         }
         certificateFileUrl = uploaded.url;
      } catch (err) {
         throw new ApiError(400, "Certificate file upload failed.");
      }
   }

   const newCertificate = new Certificate({
      certificateName,
      certificateCode,
      certificateIssuedBy,
      certificateDuration,
      certificatePoints,
      certificateLink,
      certificateFile: certificateFileUrl,
   });

   await newCertificate.save();

   student.certificates = student.certificates || [];
   student.certificates.push(newCertificate._id);
   await student.save();

   res.status(201).json({
      success: true,
      data: newCertificate,
      message: "Certificate created successfully",
   });
});

// Get certificates for authenticated student
export const getCertificates = asyncHandler(async (req, res) => {
   const student = req.user;

   if (!student || student.role !== "Student") {
      throw new ApiError(401, "Unauthorized - User is not a student.");
   }

   const studentWithCertificates = await Student.findById(student._id).populate(
      "certificates"
   );

   if (!studentWithCertificates) {
      throw new ApiError(404, "Student not found.");
   }

   res.status(200).json({
      success: true,
      data: studentWithCertificates.certificates,
   });
});

// Get certificate by ID
export const getCertificateById = asyncHandler(async (req, res) => {
   const { certificateId } = req.params;

   const certificate = await Certificate.findById(certificateId);
   if (!certificate) {
      throw new ApiError(404, "Certificate not found.");
   }

   res.status(200).json({
      success: true,
      data: certificate,
   });
});

// Update certificate
export const updateCertificate = asyncHandler(async (req, res) => {
   const { certificateId } = req.params;
   const updatedData = req.body;

   if (req.file) {
      const fileLocalPath = req.file.path;
      const uploaded = await uploadonCloudinary(fileLocalPath);
      if (!uploaded) {
         throw new ApiError(400, "Certificate file upload failed.");
      }
      updatedData.certificateFile = uploaded.url;
   }

   const updatedCertificate = await Certificate.findByIdAndUpdate(
      certificateId,
      updatedData,
      { new: true, runValidators: true }
   );

   if (!updatedCertificate) {
      throw new ApiError(404, "Certificate not found.");
   }

   res.status(200).json({
      success: true,
      data: updatedCertificate,
   });
});

// Delete certificate
export const deleteCertificate = asyncHandler(async (req, res) => {
   const { certificateId } = req.params;

   const deleted = await Certificate.findByIdAndDelete(certificateId);
   if (!deleted) {
      throw new ApiError(404, "Certificate not found.");
   }

   res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
   });
});

export const getCertificatesByStudent = asyncHandler(async (req, res) => {
   const user = req.user; // authenticated user (teacher or student)
   const { rollNumber } = req.params;

   // Only allow teachers or admins to fetch certificates by roll number
   if (!user || (user.role !== "Teacher" && user.role !== "Admin")) {
      throw new ApiError(401, "Unauthorized - Access denied.");
   }

   // Find the student by roll number
   const student = await Student.findOne({ rollNumber }).populate(
      "certificates"
   );

   if (!student) {
      throw new ApiError(404, "Student not found.");
   }

   res.status(200).json({
      success: true,
      data: student.certificates,
   });
});
