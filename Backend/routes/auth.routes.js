import express from "express";
import {
    changePassword,
    deleteProfile,
    getMe,
    login,
    logout,
    register,
    uploadProfile,
    verifyEmail,
} from "../controllers/auth.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

router.get("/me", isAuthenticated, getMe);

router.post("/change-password", isAuthenticated, changePassword);
router.post("/upload-profile", isAuthenticated, upload.single("profileImage"), uploadProfile);
router.post("/delete-profile", isAuthenticated, deleteProfile)
router.get("/verify/:token", verifyEmail);

export default router;
