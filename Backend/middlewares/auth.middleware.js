import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized request",
        });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
        return res.status(401).json({
            message: "Something went wrong while decoding token",
        });
    }

    try {
        const user = await User.findById(decodedToken?.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        req.user = user;
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            error: error?.message,
        });
    } finally {
        next();
    }
};
