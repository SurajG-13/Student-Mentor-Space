import mongoose, { Schema } from "mongoose";

const LabSubjectMarksSchema = new Schema({
   labSubject: {
      type: Schema.Types.ObjectId,
      ref: "LabSubject",
      required: true,
   },
   pca1: Number,
   pca2: Number,
   final: String,
});

const SemesterSchema = new Schema({
   semesterNo: { type: Number, required: true },
   subjects: [LabSubjectMarksSchema],
});

const LabMarksSchema = new Schema({
   studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
   },
   rollNumber: { type: String, required: true, unique: true },
   department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
   },
   semesters: [SemesterSchema],
});

const LabMarks = mongoose.model("LabMarks", LabMarksSchema);
export default LabMarks;
