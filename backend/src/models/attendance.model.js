import mongoose, { Schema, model } from "mongoose";

const AttendanceSchema = new Schema(
   {
      student: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Student",
         required: true,
      },
      subject: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Subject",
         required: true,
      },
      currentSemester: {
         type: Number,
         required: true,
      },
      department: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Department",
         required: true,
      },
      attendanceRecords: [
         {
            date: { type: Date, required: true },
            status: {
               type: String,
               enum: ["present", "absent", "leave"],
               required: true,
            },
            remarks: { type: String },
         },
      ],
   },
   { timestamps: true }
);

// Optional: Ensure unique attendance record per student-subject-semester
AttendanceSchema.index(
   { student: 1, subject: 1, semesterNo: 1 },
   { unique: true }
);

export default model("Attendance", AttendanceSchema);
