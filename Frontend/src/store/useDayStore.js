import { dayService } from "@/api/dayService";
import { create } from "zustand";

export const useDayStore = create((set) => ({
    days: [],
    setDays: async () => {
        try {
            const response = await dayService.getAllPastDayDocs();

            if (response.data.success) {
                const dayDocs = response.data.dayDocs;

                set(() => ({ days: dayDocs }));
            }
        } catch (error) {
            set(() => ({ days: [] }));
        }
    },
}));
