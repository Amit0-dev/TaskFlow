import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore.js";
import { useNavigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);


    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (
            !isLoggedIn &&
            (location.pathname !== "/" ||
                location.pathname !== "/login" ||
                location.pathname !== "/signup")
        ) {
            navigate("/");
        } else if (
            isLoggedIn &&
            (location.pathname === "/login" || location.pathname === "/signup")
        ) {
            navigate("/home");
        }

        setIsLoading(false);
    }, [isLoggedIn, location.pathname]);

    return isLoading ? (
        <>
            <h3>Loading</h3>
        </>
    ) : (
        <>{children}</>
    );
};

export default Protected;
