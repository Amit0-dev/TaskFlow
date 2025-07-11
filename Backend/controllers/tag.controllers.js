import { Tag } from "../models/tag.model.js";

const createTag = async (req, res) => {
    const { tagName } = req.body;

    if (!tagName) {
        return res.status(400).json({
            message: "TagName is required",
        });
    }

    try {
        const tagDocs = await Tag.create({
            tagName,
            userId: req.user?._id,
        });

        if (!tagDocs) {
            return res.status(400).json({
                message: "Tag not created - something went wrong",
            });
        }

        return res.status(200).json({
            message: "Tag created successfully",
            success: true,
            tagDocs,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Tag not created",
            success: false,
            error,
        });
    }
};
const updateTag = async (req, res) => {
    const { tagName } = req.body;

    if (!tagName) {
        return res.status(400).json({
            message: "TagName is required",
        });
    }

    const { tagId } = req.params;

    if (!tagId) {
        return res.status(400).json({
            message: "tagId is required",
        });
    }

    try {
        const updatedTagDocs = await Tag.findByIdAndUpdate(
            tagId,
            {
                $set: {
                    tagName,
                    userId: req.user?._id,
                },
            },
            { new: true }
        );

        if (!updatedTagDocs) {
            return res.status(400).json({
                message: "Tag not updated - something went wrong",
            });
        }

        return res.status(200).json({
            message: "Tag updated successfully",
            success: true,
            updatedTagDocs,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Tag not updated",
            success: false,
            error,
        });
    }
};
const deleteTag = async (req, res) => {
    const { tagId } = req.params;

    if (!tagId) {
        return res.status(400).json({
            message: "tagId is required",
        });
    }

    try {
        const deletedTag = await Tag.findByIdAndDelete(tagId);

        if (!deletedTag) {
            return res.status(400).json({
                message: "Tag not deleted - something went wrong",
            });
        }

        return res.status(200).json({
            message: "Tag deleted successfully",
            success: true,
            deletedTag,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Tag not deleted",
            success: false,
            error,
        });
    }
};
const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find({ userId: req.user?._id });

        return res.status(200).json({
            message: "Tags fetched successfully",
            success: true,
            tags,
        });
    } catch (error) {
        return res.status(200).json({
            message: "Tags does not fetched successfully",
            success: false,
            error,
        });
    }
};

export { createTag, updateTag, deleteTag, getAllTags };
