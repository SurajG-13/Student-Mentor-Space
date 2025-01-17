import mongoose, { Schema } from "mongoose";

const externalAssessmentSchema = new Schema(
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

      department: {
         type: Schema.Types.ObjectId,
         ref: "Department",
      },

      // Information Technology :
      Semester01_7559: { type: String },
      Semester01_7554: { type: String },
      Semester01_7558: { type: String },
      Semester01_7566: { type: String },

      Semester02_7559: { type: String },
      Semester02_7554: { type: String },
      Semester02_7558: { type: String },
      Semester02_7566: { type: String },

      Semester03_7559: { type: String },
      Semester03_7554: { type: String },
      Semester03_7558: { type: String },
      Semester03_7566: { type: String },

      Semester04_7559: { type: String },
      Semester04_7554: { type: String },
      Semester04_7558: { type: String },
      Semester04_7566: { type: String },

      Semester05_7559: { type: String },
      Semester05_7554: { type: String },
      Semester05_7558: { type: String },
      Semester05_7566: { type: String },

      Semester06_7559: { type: String },
      Semester06_7554: { type: String },
      Semester06_7558: { type: String },
      Semester06_7566: { type: String },

      Semester07_7559: { type: String },
      Semester07_7554: { type: String },
      Semester07_7558: { type: String },
      Semester07_7566: { type: String },

      Semester08_7559: { type: String },
      Semester08_7554: { type: String },
      Semester08_7558: { type: String },
      Semester08_7566: { type: String },
   },

   {
      timestamps: true,
   }
);

export const externalAssessment = mongoose.model(
   "externalAssessment",
   externalAssessmentSchema
);
