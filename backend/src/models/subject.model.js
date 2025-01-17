import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
   {
      department: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Department",
         required: true,
      },

      UPID: {
         type: Number,
         required: true,
      },

      subjectName: {
         type: String,
         required: true,
      },

      subjectCode: {
         type: String,
      },

      semester: {
         type: Number,
         required: true,
      },

      totalCredit: {
         type: Number,
         default: 0,
      },

      creditObtained: {
         type: Number,
         required: true,
      },

      gradeObtained: {
         type: String,
         enum: ["O", "E", "A", "B", "C", "D", "F", "I", "N/A"],
         required: true,
      },

      sgpaObtained: {
         type: Number,
         required: true,
      },

      semesterResult: {
         type: String,
         enum: ["P", "X", "XP"],
         required: true,
      },

      semesterMarksheet: {
         type: String, // Cloudinary URL
         match: [
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
            "Please provide a valid URL",
         ],
      },
   },

   {
      timestamps: true,
   }
);

export const Subject = mongoose.model("Subject", subjectSchema);
