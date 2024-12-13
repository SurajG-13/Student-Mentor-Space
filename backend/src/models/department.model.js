import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
   {
      departmentID: {
         type: Number,
         required: true,
         unique: true,
      },

      departmentName: {
         type: String,
         trim: true,
         required: true,
         index: true,
      },

      departmentSymbol: {
         type: String,
         trim: true,
         index: true,
      },
   },
   { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema);
