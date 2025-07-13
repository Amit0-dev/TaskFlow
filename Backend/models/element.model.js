import mongoose, {Schema} from "mongoose";

const ElementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tagId: {
            type: Schema.Types.ObjectId,
            ref: "Tag",
            required: true,
        },
    },
    { timestamps: true }
);

export const Element = mongoose.model("Element", ElementSchema);
