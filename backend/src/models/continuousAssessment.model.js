import mongoose, { Schema } from "mongoose";

const continuousAssessmentSchema = new Schema(
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

export const continuousAssessment = mongoose.model(
   "continuousAssessment",
   continuousAssessmentSchema
);
