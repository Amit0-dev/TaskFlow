import { Day } from "../models/day.model.js";

const createDay = async (req, res) => {
    const { date, totalTasks, completedTasks } = req.body;

    if (!date || isNaN(totalTasks) || isNaN(completedTasks)) {
        return res.status(400).json({
            message:
                "Missing required fields. Ensure 'date', 'totalTasks', and 'completedTasks' are included.",
        });
    }

    try {
        const existingDayDocs = await Day.findOne({ date: date });

        if (existingDayDocs) {
            return res.status(400).json({
                message: "Day already created",
            });
        }

        const dayDocs = await Day.create({
            userId: req.user?._id,
            date,
            totalTasks,
            completedTasks,
        });

        if (!dayDocs) {
            return res.status(400).json({
                message: "Failed to create day record. Please try again.",
            });
        }

        return res.status(200).json({
            message: "Day record is created successfully",
            success: true,
            dayDocs,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to create day record. Please try again.",
            success: false,
            error,
        });
    }
};
const updateDay = async (req, res) => {
    const { date, totalTasks, completedTasks } = req.body;

    if (!date || isNaN(totalTasks) || isNaN(completedTasks)) {
        return res.status(400).json({
            message:
                "Missing required fields. Ensure 'date', 'totalTasks', and 'completedTasks' are included.",
        });
    }

    try {
        const dayDocs = await Day.findOne({ date: date });

        if (!dayDocs) {
            return res.status(400).json({
                message: "Day record not found",
            });
        }

        const updatedDayDocs = await Day.findByIdAndUpdate(
            dayDocs?._id,
            {
                $set: {
                    userId: req.user?._id,
                    date,
                    totalTasks,
                    completedTasks,
                },
            },
            { new: true }
        );

        if (!updatedDayDocs) {
            return res.status(400).json({
                message: "Failed to update day record. Please try again.",
            });
        }

        return res.status(200).json({
            message: "Day record is updated successfully",
            success: true,
            updatedDayDocs,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to update day record. Please try again.",
            success: false,
            error,
        });
    }
};

const getAllPastDayDocs = async (req, res) => {
    // Past 180 Days

    const todayStr = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
    });

    const dayAgo180 = new Date();
    dayAgo180.setDate(dayAgo180.getDate() - 180);
    const dayAgo180Str = dayAgo180.toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
    });

    try {
        const dayDocs = await Day.find({
            userId: req.user?._id,
            date: {
                $gte: dayAgo180Str,
                $lte: todayStr,
            },
        }).sort({ date: 1 });

        return res.status(200).json({
            message: "Past 180 Days record fetched successfully",
            success: true,
            dayDocs,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Days record not fetched successfully",
            success: false,
            error,
        });
    }
};

const getDayDocsBySpecificDate = async (req, res) => {
    const { date } = req.query;
    // YYYY-MM-DD

    if (!date) {
        return res.status(400).json({
            message: "Please select a specific date",
        });
    }

    try {
        const dayDocs = await Day.find({ userId: req.user?._id, date: date });

        if (!dayDocs) {
            return res.status(400).json({
                message: "Record does not exists.",
            });
        }

        return res.status(200).json({
            message: "Day record fetched successfully",
            success: true,
            dayDocs,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Day record does not fetched",
            success: false,
            error,
        });
    }
};

// POST /api/day/finalize-status

// logic: read tasks for yesterday, compute status, update Day doc

const finalizeStatus = async (req, res) => {
    const { date, status } = req.body;

    if (!date || !status) {
        return res.status(400).json({
            message: "Missing required fields - date , status",
        });
    }

    try {
        const dayDocs = await Day.findOne({ date: date });

        if (!dayDocs) {
            return res.status(400).json({
                message: "Day record not found",
            });
        }

        const updatedDayDocs = await Day.findByIdAndUpdate(
            dayDocs._id,
            {
                $set: {
                    status: status,
                    statusFinalized: true,
                },
            },
            { new: true }
        );

        if (!updatedDayDocs) {
            return res.status(400).json({
                message: "Day record not updated - Please try again",
            });
        }

        return res.status(200).json({
            message: "Day record is updated successfully",
            success: true,
            updatedDayDocs,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Day record doesn't updated successfully",
            success: true,
            error,
        });
    }
};

export { createDay, updateDay, finalizeStatus, getDayDocsBySpecificDate, getAllPastDayDocs };
