import { Task } from "../models/task.model.js";

const createTask = async (req, res) => {
    const { content, dueDate, note } = req.body;

    if ((!content, !dueDate)) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const task = await Task.create({
            content,
            dueDate,
            note: note ? note : "",
            owner: req.user?._id,
        });

        if (!task) {
            return res.status(400).json({
                message: "Something went wrong while creating task",
            });
        }

        return res.status(200).json({
            message: "Task created successfully",
            success: true,
            task,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Task not created successfully",
            success: false,
            error,
        });
    }
};
const updateTask = async (req, res) => {
    const { content, dueDate, note } = req.body;

    const { taskId } = req.params;

    if (!taskId) {
        return res.status(400).json({
            message: "Invalid taskID",
        });
    }

    if ((!content, !dueDate)) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                $set: {
                    content,
                    dueDate,
                    note: note ? note : "",
                    owner: req.user?._id,
                },
            },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(400).json({
                message: "Something went wrong while updating task",
            });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            success: true,
            updatedTask,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Task not updated successfully",
            success: false,
            error,
        });
    }
};
const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
        return res.status(400).json({
            message: "Invalid taskID",
        });
    }

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(400).json({
                message: "Task not deleted - Something went wrong",
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully",
            success: true,
            deletedTask,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Task not deleted successfully",
            success: false,
            error,
        });
    }
};
const getAllTask = async (req, res) => {
    // http://localhost:8080/api/v1/task/tasks?date=10-07-2025 -> TODO (form of date)

    const { date } = req.query;

    const start = new Date(date);
    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999);

    if (!date) {
        return res.status(400).json({
            message: "Please select a specific date",
        });
    }

    try {
        const tasks = await Task.find({
            owner: req.user?._id,
            createdAt: {
                $gte: start,
                $lte: end,
            },
        });

        return res.status(200).json({
            message:
                tasks.length > 0 ? "Tasks fetched successfully" : "Not any Task created till now !",
            tasks,
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Tasks not fetched successfully",
            error,
            success: false,
        });
    }
};

const getYesterdayTasksForStreak = async (req, res) => {
    const { date } = req.body;

    if (!date) {
        return res.status(400).json({
            message: "Please select a specific date",
        });
    }

    const start = new Date(date);
    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999);

    try {
        const tasks = await Task.find({
            owner: req.user?._id,
            dueDate: {
                $gte: start,
                $lte: end,
            },
            status: "Completed",
        });

        return res.status(200).json({
            message: "Tasks fetched successfully",
            success: true,
            tasks,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Tasks not fetched successfully",
            success: false,
            error,
        });
    }
};

// TODO
/*
1. make route for update status of task
2. make route for update priority of task

*/

export { createTask, updateTask, deleteTask, getAllTask, getYesterdayTasksForStreak };
