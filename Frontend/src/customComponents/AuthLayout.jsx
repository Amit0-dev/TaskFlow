import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const AuthLayout = ({ children }) => {
    return (
        <div className="w-full min-h-screen bg-black text-white px-30">
            <Navbar />

            <Outlet />
        </div>
    );
};

export default AuthLayout;
