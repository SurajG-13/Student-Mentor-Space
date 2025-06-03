import mongoose, { Schema, model } from "mongoose";

const SubjectSchema = new Schema({
   subjectName: { type: String, required: true },
   subjectCode: { type: String, required: true }, // this takes UPID as per MAKAUT norms
   subjectCredit: { type: Number, default: 0 },
   semesterNo: { type: Number, required: true },
   department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
   },
});

// Optional index for performance
SubjectSchema.index({ department: 1, semesterNo: 1 });

export default model("Subject", SubjectSchema);
