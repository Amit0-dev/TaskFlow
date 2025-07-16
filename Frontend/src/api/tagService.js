import { axiosInstance } from "./axios";

export const tagService = {
    createTag: async (data) => {
        try {
            const response = await axiosInstance.post("/keep/tag/c", data);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    updateTag: async (tagId, data) => {
        try {
            const response = await axiosInstance.post(`/keep/tag/u/${tagId}`, data);
            return response;
        } catch (error) {
            return error?.response?.data || error;
        }
    },
    deleteTag: async (tagId) => {
        try {
            const response = await axiosInstance.post(`/keep/tag/d/${tagId}`);
            return response;
        } catch (error) {
            return error?.response?.data || error;
        }
    },
    getAllTags: async () => {
        try {
            const response = await axiosInstance.get("/keep/tags");
            return response;
        } catch (error) {
            return error?.response?.data || error;
        }
    },
    getAllTagsAndElements: async () => {
        try {
            const response = await axiosInstance.get("/keep/dashboard/a/te");
            return response;
        } catch (error) {
            return error?.response?.data || error;
        }
    },
};
