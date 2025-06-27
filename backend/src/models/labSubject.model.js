import mongoose, { Schema, model } from "mongoose";

const LabSubjectSchema = new Schema({
   labSubjectName: { type: String, required: true },
   labSubjectCode: { type: String, required: true }, // this takes UPID as per MAKAUT norms
   labSubjectCredit: { type: Number, default: 0 },
   semesterNo: { type: Number, required: true },
   department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
   },
});

// Optional index for performance
LabSubjectSchema.index({ department: 1, semesterNo: 1 });

export default model("LabSubject", LabSubjectSchema);
