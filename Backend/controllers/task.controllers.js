import { Task } from "../models/task.model.js";

const createTask = async (req, res) => {
    const { content, dueDate, note, taskCreatedDate } = req.body;

    if (!content || !dueDate || !taskCreatedDate) {
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
            taskCreatedDate,
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
    const { content, dueDate, note, taskCreatedDate } = req.body;

    const { taskId } = req.params;

    if (!taskId) {
        return res.status(400).json({
            message: "Invalid taskID",
        });
    }

    if (!content || !dueDate || !taskCreatedDate) {
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
                    taskCreatedDate,
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
    // http://localhost:8080/api/v1/task/tasks?date=2025-07-15

    const { date } = req.query;

    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0); // ✅ 12:00 AM UTC
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
            taskCreatedDate: {
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

// for daily streaks handling
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
2. make route for update priority of task

*/

const updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
        return res.status(400).json({
            message: "Invalid taskID",
        });
    }
    const { check } = req.body;

    if (check) {
        try {
            const response = await Task.findByIdAndUpdate(taskId, { status: "Completed" });
            if (!response) {
                return res.status(200).json({
                    message: "Task's status not Update",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Task's status Update",
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Task's status not Update",
                error,
            });
        }
    } else {
        try {
            const response = await Task.findByIdAndUpdate(taskId, { status: "Pending" });
            if (!response) {
                return res.status(200).json({
                    message: "Task's status not Update",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Task's status Update",
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Task's status not Update",
                error,
            });
        }
    }
};

const getAllTaskOfUser = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user?._id });
        const response = {
            TotalTask: tasks.length,
            TotalTaskDone:
                tasks.length <= 0 ? 0 : tasks.filter((task) => task.status === "Completed").length,
            TotalTaskMiss:
                tasks.length <= 0 ? 0 : tasks.filter((task) => task.status !== "Completed").length,
        };

        return res.status(200).json({
            message: "Total task of loggedIn user",
            success: true,
            response,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Tasks not fetched",
            success: false,
            error,
        });
    }
};

export {
    createTask,
    updateTask,
    deleteTask,
    getAllTask,
    getYesterdayTasksForStreak,
    updateTaskStatus,
    getAllTaskOfUser
};
