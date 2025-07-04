// import mongoose, { Schema } from "mongoose";

// const SubjectMarksSchema = new Schema({
//    subjectName: { type: String, required: true },
//    ca1: Number,
//    ca2: Number,
//    ca3: Number,
//    ca4: Number,
//    pca1: Number,
//    pca2: Number,
//    final: Number,
// });

// const SemesterSchema = new Schema({
//    semesterNo: { type: Number, required: true },
//    subjects: [SubjectMarksSchema],
// });

// const MarksSchema = new Schema({
//    studentId: {
//       type: Schema.Types.ObjectId,
//       ref: "Student",
//       required: true,
//    },
//    rollNumber: { type: String, required: true, unique: true },
//    department: {
//       type: Schema.Types.ObjectId,
//       ref: "Department",
//    },

//    semesters: [SemesterSchema],
// });

// // Correct export syntax
// const Marks = mongoose.model("Marks", MarksSchema);
// export default Marks;

import mongoose, { Schema } from "mongoose";

const SubjectMarksSchema = new Schema({
   subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
   },
   ca1: Number,
   ca2: Number,
   ca3: Number,
   ca4: Number,
   pca1: Number,
   pca2: Number,
   final: String,
});

const SemesterSchema = new Schema({
   semesterNo: { type: Number, required: true },
   subjects: [SubjectMarksSchema],
});

const MarksSchema = new Schema({
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

const Marks = mongoose.model("Marks", MarksSchema);
export default Marks;
