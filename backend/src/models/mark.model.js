import mongoose, { Schema } from "mongoose";

const marksSchema = new Schema(
   {
      student: {
         type: Schema.Types.ObjectId,
         ref: "Student",
         required: true,
      },

      subject: {
         type: Schema.Types.ObjectId,
         ref: "Subject",
         required: true,
      },

      department: {
         type: Schema.Types.ObjectId,
         ref: "Department",
      },

      totalCredit: {
         type: Number,
         required: true,
      },

      creditObtained: {
         type: Number,
         required: true,
      },

      gradeObtained: {
         type: String,
         enum: ["O", "E", "A", "B", "C", "D", "F", "I"],
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

      semester: {
         type: Number,
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

export const Marks = mongoose.model("Marks", marksSchema);
