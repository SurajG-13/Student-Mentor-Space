import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
   {
      studentName: {
         type: String,
      },

      eMail: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
         index: true,
         match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      },

      department: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Department",
         required: true,
      },

      registrationNumber: {
         type: Number,
         required: true,
         unique: true,
      },

      rollNumber: {
         type: Number,
         required: true,
         unique: true,
      },

      admissionYear: {
         type: Number,
         required: true,
      },

      contactNumber: {
         type: Number,
         required: true,
      },

      dateOfBirth: {
         type: Date,
         required: true,
      },

      localArea: {
         type: Number,
         required: true,
      },

      postOffice: {
         type: Number,
         required: true,
      },

      pinCode: {
         type: Number,
         required: true,
      },

      xMarks: {
         type: Number,
         required: true,
      },

      xiiMarks: {
         type: Number,
      },

      diplomaMarks: {
         type: Number,
      },
   },
   {
      timestamps: true,
   }
);

export const Student = mongoose.model("Student", studentSchema);
