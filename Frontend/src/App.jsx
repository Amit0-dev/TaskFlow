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

function App() {
    console.log("App Run...");

    const checkAuth = useAuthStore((state) => state.checkAuth);
    const loading = useAuthStore((state) => state.loading);

    useEffect(() => {
        checkAuth();
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
