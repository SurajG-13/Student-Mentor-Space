import { Certificate } from "../models/certificate.model.js"; // Import Certificate model

// Create a new certificate
export const createCertificate = async (req, res) => {
   try {
      const {
         certificateName,
         certificateCode,
         certificateIssuedBy,
         certificateDuration,
      } = req.body;

      const newCertificate = new Certificate({
         certificateName,
         certificateCode,
         certificateIssuedBy,
         certificateDuration,
      });

      await newCertificate.save();
      res.status(201).json({
         message: "Certificate created successfully",
         newCertificate,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get all certificates
export const getCertificates = async (req, res) => {
   try {
      const certificates = await Certificate.find();
      res.status(200).json(certificates);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get certificate by ID
export const getCertificateById = async (req, res) => {
   try {
      const { certificateId } = req.params;

      const certificate = await Certificate.findById(certificateId);
      if (!certificate) {
         return res.status(404).json({ message: "Certificate not found" });
      }

      res.status(200).json(certificate);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update certificate details
export const updateCertificate = async (req, res) => {
   try {
      const { certificateId } = req.params;
      const {
         certificateName,
         certificateCode,
         certificateIssuedBy,
         certificateDuration,
      } = req.body;

      const updatedCertificate = await Certificate.findByIdAndUpdate(
         certificateId,
         {
            certificateName,
            certificateCode,
            certificateIssuedBy,
            certificateDuration,
         },
         { new: true }
      );

      if (!updatedCertificate) {
         return res.status(404).json({ message: "Certificate not found" });
      }

      res.status(200).json(updatedCertificate);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Delete a certificate
export const deleteCertificate = async (req, res) => {
   try {
      const { certificateId } = req.params;

      const deletedCertificate =
         await Certificate.findByIdAndDelete(certificateId);
      if (!deletedCertificate) {
         return res.status(404).json({ message: "Certificate not found" });
      }

      res.status(200).json({ message: "Certificate deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
