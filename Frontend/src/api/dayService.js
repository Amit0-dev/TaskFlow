import { axiosInstance } from "./axios.js";

export const dayService = {
    createDay: async (data) => {
        try {
            const response = await axiosInstance.post("/day/c-day", data);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    updateDay: async (data) => {
        try {
            const response = await axiosInstance.post(`/day/u-day`, data);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    getAllPastDayDocs: async () => {
        try {
            const response = await axiosInstance.get("/day/docs");
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    getDayDocsBySpecificDate: async (date) => {
        try {
            const response = await axiosInstance.get(`/day/doc?date=${date}`);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    finalizeStatus: async (data) => {
        try {
            const response = await axiosInstance.post("/day/finalize-status", data);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    
};
