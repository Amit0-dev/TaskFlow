import { Element } from "../models/element.model.js";

const createElement = async (req, res) => {
    const { title, content, tagId } = req.body;

    if (!title || !content || !tagId) {
        return res.status(400).json({
            message:
                "Missing required fields. Ensure 'title', 'content', and 'tagId' are included.",
        });
    }

    try {
        const elemDocs = await Element.create({
            title,
            content,
            userId: req.user?._id,
            tagId,
        });

        if (!elemDocs) {
            return res.status(400).json({
                message: "Element not created - something went wrong",
            });
        }

        return res.status(200).json({
            message: "Element created successfully",
            success: true,
            elemDocs,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Element not created",
            success: false,
            error,
        });
    }
};
const updateElement = async (req, res) => {
    const { elemId } = req.params;

    if (!elemId) {
        return res.status(400).json({
            message: "elemId is required",
        });
    }

    const { title, content, tagId } = req.body;

    if (!title || !content || !tagId) {
        return res.status(400).json({
            message:
                "Missing required fields. Ensure 'title', 'content', and 'tagId' are included.",
        });
    }

    try {
        const updatedElemDocs = await Element.findByIdAndUpdate(
            elemId,
            {
                $set: {
                    title,
                    content,
                    userId: req.user?._id,
                    tagId,
                },
            },
            { new: true }
        );

        if (!updatedElemDocs) {
            return res.status(400).json({
                message: "Element not updated - something went wrong",
            });
        }

        return res.status(200).json({
            message: "Element updated successfully",
            success: true,
            updatedElemDocs,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Element not updated",
            success: false,
            error,
        });
    }
};
const deleteElement = async (req, res) => {
    const { elemId } = req.params;

    if (!elemId) {
        return res.status(400).json({
            message: "elemId is required",
        });
    }

    try {
        const deletedElemDocs = await Element.findByIdAndDelete(elemId);

        if (!deletedElemDocs) {
            return res.status(400).json({
                message: "Element not deleted - something went wrong",
            });
        }

        return res.status(200).json({
            message: "Element deleted successfully",
            success: true,
            deletedElemDocs,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Element not deleted",
            success: false,
            error,
        });
    }
};
const getElementsByTagId = async (req, res) => {
    // filter element based on tagId and userId ( currently loggedIn User )

    const { tagId } = req.params;

    if (!tagId) {
        return res.status(400).json({
            message: "Missing required fields. Ensure 'tagId' are included.",
        });
    }

    try {
        const elemDocs = await Element.find({ userId: req.user?._id, tagId: tagId });

        return res.status(200).json({
            message:
                elemDocs.length > 0 ? "Element fetched successfully" : "Element not created yet",
            success: true,
            elemDocs,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Element does not fetched successfully",
            success: false,
            error,
        });
    }
};

export { createElement, updateElement, deleteElement, getElementsByTagId };
