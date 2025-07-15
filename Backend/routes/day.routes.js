import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
    createDay,
    updateDay,
    finalizeStatus,
    getAllPastDayDocs,
    getDayDocsBySpecificDate,
} from "../controllers/day.controllers.js";

const router = express.Router();

router.post("/c-day", isAuthenticated, createDay);
router.post("/u-day", isAuthenticated, updateDay);
router.post("/finalize-status", isAuthenticated, finalizeStatus)

router.get("/doc", isAuthenticated, getDayDocsBySpecificDate)
router.get("/docs", isAuthenticated, getAllPastDayDocs)

export default router;
