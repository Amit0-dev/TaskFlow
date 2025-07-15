import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Completed", "Skipped"],
            default: "Pending",
        },
        note: {
            type: String,
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },
        dueDate: {
            type: String,
            required: true,
        },
        taskCreatedDate: {
            type: Date,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
