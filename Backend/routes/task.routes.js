import express from "express"
import { createTask, deleteTask, getAllTask, getYesterdayTasksForStreak, updateTask } from "../controllers/task.controllers.js"
import {isAuthenticated} from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/c-task",isAuthenticated, createTask)
router.post("/u-task/:taskId",isAuthenticated, updateTask)
router.post("/d-task/:taskId",isAuthenticated, deleteTask)

router.get("/tasks",isAuthenticated, getAllTask)
router.get("/tasks/old",isAuthenticated, getYesterdayTasksForStreak)

export default router