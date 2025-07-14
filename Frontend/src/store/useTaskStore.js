import { taskService } from "@/api/taskService";
import { create } from "zustand";

export const useTaskStore = create((set) => ({
    tasks: [],
    addTaskState: (task) => {
        set((state) => ({ tasks: [...task] }));
    },

    fetchTaskAndUpdateState: async () => {
        try {
            const response = await taskService.getAllTasks(new Date().toISOString().split("T")[0]);
            if (response.data.success) {
                // set task state into store
                const taskList = response.data.tasks || [];
                set(() => ({ tasks: taskList }));
            }
        } catch (error) {
            set(() => ({ tasks: [] }));
        }
    },
}));
