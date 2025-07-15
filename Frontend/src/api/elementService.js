import { axiosInstance } from "./axios";

export const elementService = {
    createElement: async (data) => {
        try {
            const response = await axiosInstance.post("/keep/elem/c", data);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    updateElement: async (elemId, data) => {
        try {
            const response = await axiosInstance.post(`/keep/elem/u/${elemId}`, data);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    deleteElement: async (elemId) => {
        try {
            const response = await axiosInstance.post(`/keep/elem/d/${elemId}`);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    getElementsByTagId: async (tagId) => {
        try {
            const response = await axiosInstance.get(`/keep/elem/${tagId}`);
            return response;
        } catch (error) {
            return error?.response?.data || error;
        }
    },
};
