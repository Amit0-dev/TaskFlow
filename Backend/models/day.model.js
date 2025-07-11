import mongoose, { Schema } from "mongoose";

const daySchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: String, // "YYYY-MM-DD"
            required: true,
        },
        totalTasks: {
            type: Number,
            default: 0,
        },
        completedTasks: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["Partial", "Completed", "None"],
            default: "None",
        },
        statusFinalized: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export const Day = mongoose.model("Day", daySchema);
