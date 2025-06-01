import mongoose, { Schema } from "mongoose";

const internshipSchema = new Schema(
   {
      companyName: {
         type: String,
         required: true,
         trim: true,
      },

      internshipDuration: {
         type: Number,
         default: 1,
      },

      joinDate: {
         type: Date,
      },

      internshipSource: {
         type: String,
         trim: true,
      },

      studentId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Student",
         required: true, // Link internship to a student
      },
   },
   {
      timestamps: true,
   }
);

export const Internship = mongoose.model("Internship", internshipSchema);
