import mongoose, { Schema } from "mongoose";

const externalAssesmentSchema = new Schema(
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

export const externalAssesment = mongoose.model(
   "externalAssesment",
   externalAssesmentSchema
);
