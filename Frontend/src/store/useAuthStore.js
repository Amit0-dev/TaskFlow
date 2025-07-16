import { authService } from "@/api/authService";
import { create } from "zustand";

const useAuthStore = create((set) => ({
    isLoggedIn: false,
    userData: null,
    loading: true,

    loginState: (userData) => {
        set({ userData: userData, isLoggedIn: true });
    },
    logoutState: () => {
        set({ isLoggedIn: false, userData: null });
    },
    checkAuth: async () => {
        try {
            const response = await authService.getLoggedInUser();
            if (response.data.success) {
                set({ userData: response.data.user, isLoggedIn: true, loading: false });
            }
        } catch (error) {
            if (error.response?.status === 401) {
                set({ isLoggedIn: false, userData: null, loading: false });
            } else {
                set({ isLoggedIn: false, userData: null, loading: false });
            }
        }
    },
    setUserData: (userData) => {
        set({ userData: userData });
    },
}));

export default useAuthStore;
