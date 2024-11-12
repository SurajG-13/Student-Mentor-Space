import mongoose, { mongo, Schema } from "mongoose";

const subjectSchema = new Schema(
   {
      department: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Department",
         required: true,
      },

      semester: {
         type: Number,
      },

      subjectName: {
         type: String,
         required: true,
      },

      subjectCode: {
         type: String,
      },

      UPID: {
         type: Number,
         required: true,
      },

      totalCredit: {
         type: Number,
         default: 0,
      },
   },

   {
      timestamps: true,
   }
);

export const Subject = mongoose.model("Subject", subjectSchema);
