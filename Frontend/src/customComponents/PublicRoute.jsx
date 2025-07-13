import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const loading = useAuthStore((state) => state.loading);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home");
        }
    }, []);

    if (loading)
        return (
            <div className="w-full h-screen flex bg-black text-white items-center justify-center">
                <h3 className="font-semibold text-gray-300">Loading</h3>
            </div>
        );

    return <div>{children}</div>;
};

export default PublicRoute;
