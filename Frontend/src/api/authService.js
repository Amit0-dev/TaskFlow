import axios from "axios";
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
            const response = await axiosInstance.post("/auth/login", credentials);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    logout: async () => {
        try {
            const response = await axiosInstance.post("/auth/logout");
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    getLoggedInUser: async () => {
        try {
            const response = await axiosInstance.get("/auth/me");
            return response;
        } catch (error) {
            if (error.response?.status === 401) {
                console.warn("Not logged In...");
            } else {
                throw error?.response?.data || error;
            }
        }
    },
    uploadProfile: async (formData) => {
        try {
            const response = await axios.post("/auth/upload-profile", formData, {
                baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
                withCredentials: true,
            });
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    deleteProfile: async () => {
        try {
            const response = await axiosInstance.post("/auth/delete-profile");
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
    updateStreak: async (data) => {
        try {
            const response = await axiosInstance.post("/auth/update-streak", data);
            return response;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },
};
