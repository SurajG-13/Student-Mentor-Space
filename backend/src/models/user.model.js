import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const userSchema = new Schema(
   {
      fullName: {
         type: String,
         required: true,
         lowercase: true,
         trim: true,
      },

      eMail: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
         match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      },

      role: {
         type: String,
         required: true,
      },

      avatar: {
         type: String, // Cloudinary URL
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

      userPassword: {
         type: String, // Encrypted Password will be stored
         required: [true, "Password is Required!"],
      },

      refreshToken: {
         type: String,
      },
   },
   { timestamps: true }
);

// Password Hashing using Bcrypt

userSchema.pre("save", async function (next) {
   if (this.isModified("userPassword")) {
      try {
         this.userPassword = await bcrypt.hash(this.userPassword, 10);
      } catch (err) {
         next(err);
      }
   }
   next();
});

// Password comparison method

userSchema.methods.isUserPasswordCorrect = async function (userPassword) {
   try {
      return await bcrypt.compare(userPassword, this.userPassword);
   } catch (error) {
      throw new ApiError(400, "Error comparing passwords");
   }
};

// JWT Token generation

userSchema.methods.generateAccessToken = function () {
   return jwt.sign(
      {
         _id: this._id,
         userName: this.userName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
   );
};

userSchema.methods.generateRefreshToken = function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
   );
};

export const User = mongoose.model("User", userSchema);
