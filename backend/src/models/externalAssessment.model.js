import mongoose, { Schema } from "mongoose";

const externalAssessmentSchema = new Schema(
   {
      department: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Department",
         required: true,
      },
   },

   {
      timestamps: true,
   }
);

export const externalAssessment = mongoose.model(
   "externalAssessment",
   externalAssessmentSchema
);
