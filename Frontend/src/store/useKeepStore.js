import { tagService } from "@/api/tagService";
import { create } from "zustand";

export const useKeepStore = create((set) => ({
    tags: [],
    setTags: (tags) => {
        set(() => ({ tags: tags }));
    },

    fetchTagAndSet: async () => {
        try {
            const response = await tagService.getAllTags();
            if (response.data.success) {
                set(() => ({ tags: response.data.tags }));
            }
        } catch (error) {
            set(() => ({ tags: [] }));
        }
    },
}));
