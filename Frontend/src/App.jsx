import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import AuthLayout from "./customComponents/AuthLayout.jsx";
import Keep from "./pages/Keep.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<AuthLayout />}
                children={[
                    <Route path="/" element={<LandingPage />} />,
                    <Route path="/home" element={<Home />} />,
                    <Route path="/keep" element={<Keep />} />,
                    <Route path="/dashboard" element={<Dashboard />} />,
                ]}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}

export default App;
