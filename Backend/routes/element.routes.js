import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
    createElement,
    deleteElement,
    getElementsByTagId,
    updateElement,
} from "../controllers/element.controllers.js";

const router = express.Router();

router.post("/c", isAuthenticated, createElement);
router.post("/u/:elemId", isAuthenticated, updateElement);
router.post("/d/:elemId", isAuthenticated, deleteElement);

router.get("/", isAuthenticated, getElementsByTagId);

export default router;
