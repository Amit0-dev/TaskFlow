import express from "express";
import { createTag, deleteTag, getAllTags, getAllTagsAndElements, updateTag } from "../controllers/tag.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/tag/c", isAuthenticated, createTag);
router.post("/tag/u/:tagId", isAuthenticated, updateTag);
router.post("/tag/d/:tagId", isAuthenticated, deleteTag);

router.get("/tags", isAuthenticated, getAllTags);
router.get("/dashboard/a/te", isAuthenticated, getAllTagsAndElements)

export default router;
