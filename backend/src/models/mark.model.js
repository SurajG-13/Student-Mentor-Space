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

      creditObtained: {
         type: Number,
         required: true,
      },

      gradeObtained: {
         type: String,
         enum: ["A", "B", "C", "D", "F"],
         required: true,
      },

      semester: {
         type: Number,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

export const Marks = mongoose.model("Marks", marksSchema);
