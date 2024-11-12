import mongoose, { Schema, Types } from "mongoose";

const teacherSchema = new Schema(
   {
      teacherName: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
         index: true,
      },

      department: {
         type: mongoose.Types.ObjectId,
         ref: "Department",
         required: true,
      },

      teacherID: {
         type: Number,
      },
   },
   { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);
