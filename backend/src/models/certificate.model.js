import mongoose, { Schema } from "mongoose";

const certificateSchema = new Schema(
   {
      certificateName: {
         type: String,
         required: true,
      },

      certificateCode: {
         type: String,
         required: true,
      },

      certificateIssuedBy: {
         type: String,
         required: true,
      },

      certificateDuration: {
         type: Number,
         default: 0,
      },
   },

   {
      timestamps: true,
   }
);

export const Certificate = mongoose.model("Certificate", certificateSchema);
