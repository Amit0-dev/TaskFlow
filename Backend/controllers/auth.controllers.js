import { User } from "../models/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import { Task } from "../models/task.model.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User is already exists",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (!user) {
            return res.status(400).json({
                message: "Something went wrong while creating user",
            });
        }

        console.log({ user });

        const token = crypto.randomBytes(32).toString("hex");

        console.log({ token });

        if (token) {
            user.verificationToken = token;

            await user.save();

            console.log({ user });
        }

        // send token into mail

        const options = {
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: user.email,
            subject: "Verify your Email",
            text: `Please click on this link to verify your email 
            ${process.env.BASE_URI}/api/v1/auth/verify/${token}
            `,
        };

        // Create a transporter for SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        await transporter.sendMail(options);

        return res.status(200).json({
            message: "User created successfully",
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            message: "User not created successfully",
            success: false,
            error,
        });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User does not exists",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "24h",
            }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        };

        return res
            .status(200)
            .cookie("token", token, cookieOptions)
            .json({
                message: "User loggedIn successfully",
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isVerified: user.isVerified,
                },
            });
    } catch (error) {
        return res.status(400).json({
            message: "User doesn't loggedIn successfully",
            success: false,
            error,
        });
    }
};
const logout = async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };

    return res.status(200).clearCookie("token", cookieOptions).json({
        message: "User loggedOut successfully",
        success: true,
    });
};
const getMe = async (req, res) => {
    const today = dayjs().startOf("day").toDate(); // Gives 2025-07-13T00:00:00.000Z

    try {
        await Task.updateMany(
            {
                owner: req.user?._id,
                dueDate: {
                    $lte: today,
                },
                status: "Pending",
            },
            { status: "Skipped" }
        );

        return res.status(200).json({
            message: "User fetched successfully",
            success: true,
            user: req?.user,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Task status Error",
            error,
            success: false,
        });
    }
};
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const user = await User.findById(req.user?._id);

        if (!user) {
            return res.status(400).json({
                message: "User does not exists",
            });
        }

        const isMatch = bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        user.password = newPassword;

        await user.save();

        return res.status(200).json({
            message: "User password is changed successfully",
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            message: "User password does not changed",
            success: false,
            error,
        });
    }
};
const verifyEmail = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({
            message: "Token is required",
        });
    }

    try {
        const user = await User.findOne({
            verificationToken: token,
        });

        if (!user) {
            return res.status(400).json({
                message: "User does not exists",
            });
        }

        user.isVerified = true;
        // when you do [user.verificationToken = null] , then the field is not removed from db
        user.verificationToken = undefined;

        await user.save();

        return res.status(200).json({
            message: "User verified successfully",
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            message: "User is not verified",
            success: false,
        });
    }
};

export { register, login, logout, getMe, changePassword, verifyEmail };
