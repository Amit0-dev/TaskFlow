import express from "express";
import {
    changePassword,
    getMe,
    login,
    logout,
    register,
    verifyEmail,
} from "../controllers/auth.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

router.get("/me", isAuthenticated, getMe);

router.post("/change-password", isAuthenticated, changePassword);
router.get("/verify/:token", verifyEmail);

export default router;
