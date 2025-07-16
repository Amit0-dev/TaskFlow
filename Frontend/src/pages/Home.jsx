import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import "react-calendar-heatmap/dist/styles.css";
import StreakHeatmap from "@/customComponents/StreakHeatMap";
import Chart from "@/customComponents/Chart";
import useAuthStore from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { taskService } from "@/api/taskService";
import { useTaskStore } from "@/store/useTaskStore";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { dayService } from "@/api/dayService";
import { useDayStore } from "../store/useDayStore.js";

const Home = () => {
    const [graphDayStreakData, setGraphDayStreakData] = useState([]);

    const [taskContent, setTaskContent] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [open, setOpen] = useState(false);
    const triggerRef = useRef();

    const [loading, setLoading] = useState(false);
    // for updated task content and note content

    const [updatedTaskContent, setUpdatedTaskContent] = useState("");
    const [updatedNoteContent, setUpdatedNoteContent] = useState("");

    // for checkBox
    const [isChecked, setIsChecked] = useState(false);

    // for deleteBtn Animation

    const [taskClicked, setTaskClicked] = useState(null);

    // for graph
    const [completedTaskCount, setCompletedTaskCount] = useState(0);
    const [unCompletedTaskCount, setUnCompletedTaskCount] = useState(0);

    const user = useAuthStore((state) => state.userData);
    const addTaskState = useTaskStore((state) => state.addTaskState);
    const tasks = useTaskStore((state) => state.tasks); // for display purpose

    const days = useDayStore((state) => state.days); // for github like graph

    const getTaskStatusColor = (status) => {
        const TaskStatusColor = {
            Pending: "text-red-400",
            Completed: "text-green-400",
            Skipped: "text-gray-600",
        };

        return TaskStatusColor[status];
    };

    const getTaskPriorityColor = (priority) => {
        const TaskPriorityColor = {
            Low: "text-blue-400",
            Medium: "text-yellow-400",
            High: "text-cyan-400",
        };

        return TaskPriorityColor[priority];
    };

    useEffect(() => {
        const completedTask = tasks.filter((task) => task.status === "Completed");
        if (completedTask) setCompletedTaskCount(completedTask.length);
        const unCompletedTask = tasks.filter((task) => task.status === "Pending");
        if (unCompletedTask) setUnCompletedTaskCount(unCompletedTask.length);
    }, [tasks]);

    useEffect(() => {
        const finalizedDays = days.filter((day) => day.statusFinalized === true);

        const graphData = finalizedDays.map((day) => ({
            date: day.date,
            status: day.status,
            count: day.completedTasks,
        }));

        // set into localState
        setGraphDayStreakData(graphData);
    }, [days]);

    // const sampleData = [
    //     { date: "2025-07-01", status: "Completed", count: 5 },
    //     { date: "2025-07-02", status: "Partial", count: 2 },
    //     { date: "2025-07-03", status: "None", count: 0 },
    // ];

    const handleTaskSubmit = async () => {
        setLoading(true);
        const taskData = {
            content: taskContent,
            dueDate: new Date().toLocaleDateString("en-CA"),
            note: noteContent,
            taskCreatedDate: new Date().toLocaleDateString("en-CA"),
        };

        try {
            const response = await taskService.createTask(taskData);
            if (response.data.success) {
                const response = await taskService.getAllTasks(
                    new Date().toLocaleDateString("en-CA")
                );
                if (response.data.success) {
                    // set task state into store

                    const dayCreatedDate = localStorage.getItem("dayCreatedDate");
                    const todayDate = new Date().toLocaleDateString("en-CA");

                    if (todayDate != dayCreatedDate) {
                        const dayData = {
                            date: new Date().toLocaleDateString("en-CA"),
                            totalTasks: response.data.tasks.length,
                            completedTasks: response.data.tasks.filter(
                                (task) => task.status === "Completed"
                            ).length,
                        };

                        await dayService.createDay(dayData);

                        localStorage.setItem("dayCreatedDate", todayDate);
                    }

                    addTaskState(response.data.tasks);
                }
            }
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const handleTaskUpdate = async (taskId) => {
        setLoading(true);
        const taskData = {
            content: updatedTaskContent,
            dueDate: new Date().toLocaleDateString("en-CA"),
            note: updatedNoteContent,
            taskCreatedDate: new Date().toLocaleDateString("en-CA"),
        };

        try {
            const response = await taskService.updateTask(taskData, taskId);
            if (response.data.success) {
                const response = await taskService.getAllTasks(
                    new Date().toLocaleDateString("en-CA")
                );
                if (response.data.success) {
                    // set task state into store
                    addTaskState(response.data.tasks);
                }

                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleTaskDelete = async (taskId) => {
        setTaskClicked(taskId);
        try {
            const response = await taskService.deleteTask(taskId);
            if (response.data.success) {
                const response = await taskService.getAllTasks(
                    new Date().toLocaleDateString("en-CA")
                );
                if (response.data.success) {
                    // set task state into store

                    const dayData = {
                        date: new Date().toLocaleDateString("en-CA"),
                        totalTasks: response.data.tasks.length,
                        completedTasks: response.data.tasks.filter(
                            (task) => task.status === "Completed"
                        ).length,
                    };

                    await dayService.updateDay(dayData);

                    addTaskState(response.data.tasks);
                }

                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const handleTaskCompletion = async (check, taskId) => {
        setLoading(true);
        try {
            const response = await taskService.updateTaskStatus({ check }, taskId);
            if (response.data.success) {
                const response = await taskService.getAllTasks(
                    new Date().toLocaleDateString("en-CA")
                );
                if (response.data.success) {
                    // set task state into store

                    const dayData = {
                        date: new Date().toLocaleDateString("en-CA"),
                        totalTasks: response.data.tasks.length,
                        completedTasks: response.data.tasks.filter(
                            (task) => task.status === "Completed"
                        ).length,
                    };

                    await dayService.updateDay(dayData);

                    addTaskState(response.data.tasks);
                }

                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full text-gray-300 pb-10">
            <div className="w-full flex flex-col items-end justify-center gap-1 h-22 p-10 ">
                <h4 className="font-medium text-xl tracking-wide">
                    Streak: {user?.streak?.current}🔥
                </h4>
                <h4 className="font-medium text-lg tracking-wide">{`Hey 👋 ${user?.name}`}</h4>
                <h4 className="font-medium tracking-wider">📆 July 11</h4>
            </div>

            <div className="w-full ">
                {/* In future add terminal based task addition  */}
                <div className="w-full mb-5 ">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <form>
                            <DialogTrigger asChild>
                                <button className="bg-gray-300 px-8 py-2 text-black font-semibold rounded-md hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer">
                                    Create Task
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create Task</DialogTitle>
                                    <DialogDescription>
                                        Plan your day like a pro — add your task and save it!
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="task">Task</Label>
                                        <Input
                                            value={taskContent}
                                            onChange={(e) => setTaskContent(e.target.value)}
                                            id="task"
                                            name="task"
                                            placeholder="Write Here..."
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="note">Note</Label>
                                        <Input
                                            value={noteContent}
                                            onChange={(e) => setNoteContent(e.target.value)}
                                            id="note"
                                            name="note"
                                            placeholder="Write notes here..."
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button onClick={handleTaskSubmit} type="submit">
                                        {loading ? (
                                            <div className="loader"></div>
                                        ) : (
                                            <>Save changes</>
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
                </div>
                <h3 className="font-semibold text-2xl ">Today's Tasks :</h3>

                {/* task list  */}
                <div className="flex">
                    <div className="w-1/2 h-92 pt-8 overflow-y-scroll scrollbar-hide flex flex-col gap-3 pr-5">
                        {/* task render here  */}
                        {tasks.length <= 0 ? (
                            <h4 className="font-semibold mt-10 text-center">
                                Not any Task Created
                            </h4>
                        ) : (
                            <>
                                {tasks.map((task) => (
                                    <div
                                        key={task?._id}
                                        className="flex justify-between bg-gray-900 items-center p-4 rounded-xl text-white"
                                    >
                                        <div className="flex gap-5">
                                            <input
                                                className="cursor-pointer"
                                                disabled={loading}
                                                type="checkbox"
                                                checked={task.status === "Completed"}
                                                onChange={(e) => {
                                                    setIsChecked(e.target.checked);

                                                    handleTaskCompletion(
                                                        e.target.checked,
                                                        task?._id
                                                    );
                                                }}
                                            />

                                            <div className="flex flex-col gap-1">
                                                <div className="flex gap-5">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div
                                                                className={`${getTaskStatusColor(
                                                                    task.status
                                                                )} font-semibold cursor-pointer`}
                                                            >
                                                                {task.status}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Status</p>
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div
                                                                className={`${getTaskPriorityColor(
                                                                    task.priority
                                                                )} font-semibold cursor-pointer`}
                                                            >
                                                                {task.priority}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Priority</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div
                                                                className={
                                                                    "font-semibold cursor-pointer text-orange-500"
                                                                }
                                                            >
                                                                Note
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>{task?.note || "Empty"}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div>{task.content}</div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            {/* popUp for updating the task  */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setUpdatedTaskContent(task?.content || "");
                                                    setUpdatedNoteContent(task?.note || "");

                                                    // Open dialog after state is set
                                                    requestAnimationFrame(() => {
                                                        triggerRef.current?.click();
                                                    });
                                                }}
                                            >
                                                <FiEdit className="cursor-pointer" />
                                            </button>
                                            <Dialog>
                                                <form>
                                                    <DialogTrigger asChild>
                                                        <button
                                                            ref={triggerRef}
                                                            type="button"
                                                            style={{ display: "none" }}
                                                            aria-hidden="true"
                                                        />
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Task</DialogTitle>
                                                            <DialogDescription>
                                                                Plan your day like a pro — Edit your
                                                                task and save it!
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4">
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="task">Task</Label>
                                                                <Input
                                                                    value={updatedTaskContent}
                                                                    onChange={(e) =>
                                                                        setUpdatedTaskContent(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    id="task"
                                                                    name="task"
                                                                    placeholder="Write Here..."
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="note">Note</Label>
                                                                <Input
                                                                    value={updatedNoteContent}
                                                                    onChange={(e) =>
                                                                        setUpdatedNoteContent(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    id="note"
                                                                    name="note"
                                                                    placeholder="Write notes here..."
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">
                                                                    Cancel
                                                                </Button>
                                                            </DialogClose>
                                                            <Button
                                                                onClick={() =>
                                                                    handleTaskUpdate(task?._id)
                                                                }
                                                                type="button"
                                                            >
                                                                {loading ? (
                                                                    <div className="loader"></div>
                                                                ) : (
                                                                    <>Save changes</>
                                                                )}
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </form>
                                            </Dialog>

                                            {task?._id === taskClicked ? (
                                                <div className="loader"></div>
                                            ) : (
                                                <MdDelete
                                                    onClick={() => handleTaskDelete(task?._id)}
                                                    className="cursor-pointer"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    <div className="w-1/2 h-92 pb-10 flex items-center justify-center cursor-pointer gap-14">
                        <Chart
                            labels={["Completed", "Uncompleted"]}
                            counts={[completedTaskCount, unCompletedTaskCount]}
                        />

                        <div className="flex flex-col gap-5 items-start">
                            <h4 className="flex gap-1 items-center justify-center  font-semibold">
                                <div className="w-4 h-4 bg-red-400 rounded-2xl"></div>: Completed
                            </h4>
                            <h4 className="flex gap-1 items-center justify-center  font-semibold">
                                <div className="w-4 h-4 bg-yellow-500 rounded-2xl"></div>:
                                Uncompleted
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full mt-20">
                <h3 className="text-center text-3xl font-semibold mb-5 capitalize">
                    Your Past 6 Months of Activity
                </h3>

                <StreakHeatmap data={graphDayStreakData} />
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default Home;
