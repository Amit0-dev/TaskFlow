import mongoose, { Schema } from "mongoose";

const tagSchema = new mongoose.Schema({

    tagName: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

export const Tag = mongoose.model("Tag", tagSchema);
