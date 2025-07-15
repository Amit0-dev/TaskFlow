import { axiosInstance } from "./axios.js";

export const taskService = {
    createTask: async (data) => {
        try {
            const response = await axiosInstance.post("/task/c-task", data);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    deleteTask: async (taskId) => {
        try {
            const response = await axiosInstance.post(`/task/d-task/${taskId}`);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    updateTask: async (data, taskId) => {
        try {
            const response = await axiosInstance.post(`/task/u-task/${taskId}`, data);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    getAllTasks: async (date) => {

        try {
            const response = await axiosInstance.get(`/task/tasks?date=${date}`);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    getYesterdayTasksForStreak: async (date) => { // Unused (till now not using anywhere)
        try {
            const response = await axiosInstance.get("/task/tasks/old", date);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    updateTaskStatus: async (data, taskId) => {
        try {
            const response = await axiosInstance.post(`/task/u-status/${taskId}`, data);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
