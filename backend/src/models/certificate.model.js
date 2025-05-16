import mongoose, { Schema } from "mongoose";

const certificateSchema = new Schema(
   {
      certificateName: {
         type: String,
         required: true,
      },

      certificateCode: {
         type: String,
      },

      certificateIssuedBy: {
         type: String,
         required: true,
      },

      certificateDuration: {
         type: Number,
         default: 0,
      },

      certificatePoints: {
         type: Number,
         default: 0,
      },

      certificateLink: {
         type: String,
      },

      certificateImage: {
         type: String,
      },
   },

   {
      timestamps: true,
   }
);

export const Certificate = mongoose.model("Certificate", certificateSchema);
