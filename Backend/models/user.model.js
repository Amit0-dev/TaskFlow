import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        streak: {
            current: {
                type: Number,
                default: 0,
            },
            longest: {
                type: Number,
                default: 0,
            },
            lastUpdated: {
                type: Date,
            },
            startDate: {
                type: Date,
            },
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

export const User = mongoose.model("User", userSchema);
