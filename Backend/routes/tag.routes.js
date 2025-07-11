import express from "express";
import { createTag, deleteTag, getAllTags, updateTag } from "../controllers/tag.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/tag/c", isAuthenticated, createTag);
router.post("/tag/u/:tagId", isAuthenticated, updateTag);
router.post("/tag/d/:tagId", isAuthenticated, deleteTag);

router.get("/tags", isAuthenticated, getAllTags);

export default router;
