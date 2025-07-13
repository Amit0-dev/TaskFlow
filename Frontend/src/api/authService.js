import { axiosInstance } from "./axios.js";

export const authService = {
    register: async (userData) => {
        try {
            const response = await axiosInstance.post("/auth/register", userData);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post("/auth/login", credentials)
            return response
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    logout: async () => {
        try {
            const response = await axiosInstance.post("/auth/logout")
            return response
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    getLoggedInUser: async () => {
        try {
            const response = await axiosInstance.get("/auth/me")
            return response
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
