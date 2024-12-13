import { externalAssessment } from "../models/externalAssessment.model.js";

// Create a new external assessment entry
const createExternalAssessment = async (req, res) => {
   try {
      const { department } = req.body;

      const newExternalAssessment = new externalAssessment({
         department,
      });

      await newExternalAssessment.save();

      res.status(201).json({
         message: "External Assessment created successfully",
         newExternalAssessment,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get all external assessments
const getExternalAssessments = async (req, res) => {
   try {
      const assessments = await externalAssessment
         .find()
         .populate("department");
      res.status(200).json(assessments);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Get external assessment by ID
const getExternalAssessmentById = async (req, res) => {
   try {
      const { assessmentId } = req.params;

      const assessment = await externalAssessment
         .findById(assessmentId)
         .populate("department");
      if (!assessment) {
         return res
            .status(404)
            .json({ message: "External Assessment not found" });
      }

      res.status(200).json(assessment);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Update external assessment
const updateExternalAssessment = async (req, res) => {
   try {
      const { assesmentId } = req.params;
      const { department } = req.body;

      const updatedAssesment = await externalAssessment.findByIdAndUpdate(
         assesmentId,
         { department },
         { new: true }
      );

      if (!updatedAssesment) {
         return res
            .status(404)
            .json({ message: "External Assessment not found" });
      }

      res.status(200).json(updatedAssesment);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Delete external assessment entry
const deleteExternalAssessment = async (req, res) => {
   try {
      const { assessmentId } = req.params;

      const deletedAssessment =
         await externalAssessment.findByIdAndDelete(assessmentId);
      if (!deletedAssessment) {
         return res
            .status(404)
            .json({ message: "External Assessment not found" });
      }

      res.status(200).json({
         message: "External Assessment deleted successfully",
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export {
   createExternalAssessment,
   getExternalAssessments,
   getExternalAssessmentById,
   updateExternalAssessment,
   deleteExternalAssessment,
};
