import useAuthStore from "../store/useAuthStore.js";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authService } from "../api/authService.js";

const Navbar = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const logoutState = useAuthStore((state) => state.logoutState);

    const navigate = useNavigate();

    const NavbarContent = [
        {
            title: "Login",
            path: "/login",
            isLoggedIn: !isLoggedIn,
        },
        {
            title: "Signup",
            path: "/signup",
            isLoggedIn: !isLoggedIn,
        },
        {
            title: "Home",
            path: "/home",
            isLoggedIn: isLoggedIn,
        },
        {
            title: "Keep",
            path: "/keep",
            isLoggedIn: isLoggedIn,
        },
        {
            title: "Dashboard",
            path: "/dashboard",
            isLoggedIn: isLoggedIn,
        },
    ];

    const handleLogout = async () => {
        try {
            const response = await authService.logout("/auth/logout");
            if (response.data.success) {
                logoutState();
                navigate("/");
            }
        } catch (error) {
            console.log("After logout : ", error);
        }
    };

    return (
        <nav className="w-full h-[90px] flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-medium">
                    Task<span className="text-yellow-400">Flow</span>
                </h2>
            </div>
            <div className="flex gap-5">
                {NavbarContent.map(
                    (c) =>
                        c.isLoggedIn && (
                            <NavLink
                                to={c.path}
                                key={c.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-black px-6 py-2 text-white font-semibold rounded-full cursor-pointer"
                                        : "bg-white px-6 py-2 text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer"
                                }
                            >
                                {c.title}
                            </NavLink>
                        )
                )}

                {isLoggedIn && (
                    <button
                        className="bg-white px-6 py-2 text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
