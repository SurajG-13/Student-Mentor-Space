import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
   {
      projectName: {
         type: String,
         required: true,
         trim: true,
      },

      projectDomain: {
         type: String,
         required: true,
         trim: true,
      },

      projectBio: {
         type: String,
         trim: true,
      },

      projectStack: {
         type: String,
      },

      projectLink: {
         type: String,
      },

      projectMentor: {
         type: String,
      },

      projectMembers: {
         // Updated to be an array of strings
         type: [String],
      },

      projectAvatar: {
         type: String,
         match: [
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
            "Please provide a valid avatar URL",
         ],
      },

      department: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Department",
      },

      studentId: {
         // Renamed to `studentId` to reflect it is a reference to a student
         type: mongoose.Schema.Types.ObjectId,
         ref: "Student",
      },
   },
   { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
