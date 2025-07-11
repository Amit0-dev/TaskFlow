import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    const authenticated = false

    const NavbarContent = [
        {
            title: "Login",
            path: "/login",
            isLoggedIn: !authenticated,
        },
        {
            title: "Signup",
            path: "/signup",
            isLoggedIn: !authenticated,
        },
        {
            title: "Keep",
            path: "/keep",
            isLoggedIn: authenticated,
        },
        {
            title: "Logout",
            path: "/logout",
            isLoggedIn: authenticated,
        },
    ];

    return (
        <nav className="w-full h-[90px] flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-medium">
                    Task<span className="text-yellow-400">Flow</span>
                </h2>
            </div>
            <div className="flex gap-5">
                {NavbarContent.map((c) => (
                    c.isLoggedIn && <Link to={c.path} key={c.path} className="bg-white px-6 py-2 text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer">
                        {c.title}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
