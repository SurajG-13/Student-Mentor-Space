import mongoose, { MongooseError, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

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
      },

      registrationNumber: {
         type: Number,
         unique: true,
      },

      rollNumber: {
         type: Number,

         unique: true,
      },

      admissionYear: {
         type: Number,
      },

      contactNumber: {
         type: Number,
      },

      dateOfBirth: {
         type: Date,
      },

      localArea: {
         type: String,
      },

      postOffice: {
         type: String,
      },

      pinCode: {
         type: Number,
      },

      xMarks: {
         type: Number,
      },

      xiiMarks: {
         type: Number,
      },

      diplomaMarks: {
         type: Number,
      },

      studentPassword: {
         type: String,
         required: [true, "Password is Required!"],
      },

      role: {
         type: String,
         required: true,
         enum: ["Teacher", "Student", "Guest", "Admin"],
         default: "Student",
      },
   },
   {
      timestamps: true,
   }
);

// Hash the password before saving it

studentSchema.pre("save", async function (next) {
   if (this.isModified("studentPassword")) {
      try {
         this.studentPassword = await bcrypt.hash(this.studentPassword, 10);
      } catch (err) {
         next(err);
      }
   }
   next();
});

// Method to check if password is correct

studentSchema.methods.isStudentPasswordCorrect = async function (
   studentPassword
) {
   try {
      return await bcrypt.compare(studentPassword, this.studentPassword);
   } catch (error) {
      throw new ApiError(400, "Error comparing passwords");
   }
};

// Method to generate an Access Token (JWT)

studentSchema.methods.generateAccessToken = function () {
   return jwt.sign(
      {
         _id: this._id,
         studentName: this.studentName, // Use fullName for the teacher name in the token
         role: this.role, // Include role in the token
      },
      process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // Expiry time from .env
   );
};

// Method to generate a Refresh Token (JWT)

studentSchema.methods.generateRefreshToken = function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET, // Secret key for signing the refresh token
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } // Expiry time from .env
   );
};

export const Student = mongoose.model("Student", studentSchema);
