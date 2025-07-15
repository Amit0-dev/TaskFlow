import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import AuthLayout from "./customComponents/AuthLayout.jsx";
import Keep from "./pages/Keep.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Protected from "./customComponents/Protected.jsx";
import useAuthStore from "./store/useAuthStore.js";
import { useEffect } from "react";
import PublicRoute from "./customComponents/PublicRoute.jsx";
import { useTaskStore } from "./store/useTaskStore.js";
import { dayService } from "./api/dayService.js";
import { useDayStore } from "./store/useDayStore.js";

function App() {
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const loading = useAuthStore((state) => state.loading);
    const fetchTaskAndUpdateState = useTaskStore((state) => state.fetchTaskAndUpdateState);

    const setDays = useDayStore((state) => state.setDays);

    useEffect(() => {
        const init = async () => {
            await checkAuth();
            if (useAuthStore.getState().isLoggedIn) {
                await fetchTaskAndUpdateState();

                // for graph
                const lastSyncDate = localStorage.getItem("lastSyncDate");

                const todayDate = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"

                if (lastSyncDate !== todayDate) {
                    try {
                        const today = new Date();
                        const yesterday = new Date(today);
                        yesterday.setDate(today.getDate() - 1);
                        const formatted = yesterday.toLocaleDateString("en-CA"); // ✅ Local "YYYY-MM-DD"

                        const response = await dayService.getDayDocsBySpecificDate(formatted);

                        const completedTask = response.data.dayDocs[0]?.completedTasks;

                        // partial - atleast one task complete
                        // complete - all task completed
                        // none - no any task completed
                        let status = "None";
                        if (
                            completedTask === response.data.dayDocs[0]?.totalTasks &&
                            response.data.dayDocs[0]?.totalTasks > 0
                        ) {
                            status = "Completed";
                        } else if (completedTask > 0) {
                            status = "Partial";
                        }

                        if (status && completedTask !== undefined) {
                            await dayService.finalizeStatus({ date: formatted, status });
                            localStorage.setItem("lastSyncDate", todayDate); // ✅ important
                        }
                    } catch (error) {
                        console.error("Error syncing day status:", error);
                    }
                }
            }

            await setDays();
        };

        init();
    }, []);

    if (loading)
        return (
            <div className="w-full h-screen flex bg-black text-white items-center justify-center">
                <h3 className="font-semibold text-gray-300">Loading</h3>
            </div>
        );

    return (
        <Routes>
            <Route
                path="/"
                element={<AuthLayout />}
                children={[
                    <Route
                        path="/"
                        element={
                            <Protected>
                                <LandingPage />
                            </Protected>
                        }
                    />,
                    <Route
                        path="/home"
                        element={
                            <Protected>
                                <Home />
                            </Protected>
                        }
                    />,
                    <Route
                        path="/keep"
                        element={
                            <Protected>
                                <Keep />
                            </Protected>
                        }
                    />,
                    <Route
                        path="/dashboard"
                        element={
                            <Protected>
                                <Dashboard />
                            </Protected>
                        }
                    />,
                ]}
            />
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/signup"
                element={
                    <PublicRoute>
                        <Signup />
                    </PublicRoute>
                }
            />
        </Routes>
    );
}

export default App;
