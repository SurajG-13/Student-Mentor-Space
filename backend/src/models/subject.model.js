// models/subject.model.js
import mongoose, { Schema, model } from "mongoose";

const SubjectSchema = new Schema({
   subjectName: { type: String, required: true },
   subjectCode: { type: String, required: true },

   subjectUPID: { type: Number, required: true },

   semesterNo: { type: Number, required: true },

   department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
   },
});

export default model("Subject", SubjectSchema);
