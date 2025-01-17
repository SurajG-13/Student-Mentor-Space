import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const teacherSchema = new Schema(
   {
      fullName: {
         type: String,
         required: true,
         trim: true,
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

      role: {
         type: String,
         required: true,
         enum: ["Teacher", "Student", "Guest", "Admin"],
         default: "Teacher",
      },

      avatar: {
         type: String, // Cloudinary URL for avatar image
         match: [
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
            "Please provide a valid avatar URL",
         ],
      },

      department: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
         },
      ],

      teacherPassword: {
         type: String,
         required: [true, "Password is Required!"],
      },

      refreshToken: {
         type: String,
      },
   },
   { timestamps: true }
);

// Hash the password before saving it

teacherSchema.pre("save", async function (next) {
   if (this.isModified("teacherPassword")) {
      try {
         this.teacherPassword = await bcrypt.hash(this.teacherPassword, 10);
      } catch (err) {
         next(err);
      }
   }
   next();
});

// Method to check if password is correct

teacherSchema.methods.isTeacherPasswordCorrect = async function (
   teacherPassword
) {
   try {
      return await bcrypt.compare(teacherPassword, this.teacherPassword);
   } catch (error) {
      throw new ApiError(400, "Error comparing passwords");
   }
};

// Method to generate an Access Token (JWT)

teacherSchema.methods.generateAccessToken = function () {
   return jwt.sign(
      {
         _id: this._id,
         teacherName: this.fullName, // Use fullName for the teacher name in the token
         role: this.role, // Include role in the token
      },
      process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // Expiry time from .env
   );
};

// Method to generate a Refresh Token (JWT)

teacherSchema.methods.generateRefreshToken = function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET, // Secret key for signing the refresh token
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } // Expiry time from .env
   );
};

export const Teacher = mongoose.model("Teacher", teacherSchema);
