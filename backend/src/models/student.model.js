import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
   {
      studentName: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

      department: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Department",
         required: true,
      },

      registraionNumber: {
         type: Number,
         required: true,
      },

      semester: {
         type: Number,
         required: true,
      },

      marks: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Marks",
      },

      totalMarks: {
         type: Number,
         default: 0,
      },

      overallGrade: {
         type: String,
         enum: ["A", "B", "C", "D", "F"],
         default: "C",
      },

      createdAt: {
         type: Date,
         default: Date.now,
      },
   },
   {
      timestamps: true,
   }
);

export const Student = mongoose.model("Student", studentSchema);
