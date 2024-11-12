import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
    {
        departmaneID: {
            type: Number,
            required: true,
            unique: true,
        },

        departmentName: {
            type: String,
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema);
