import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/components/magicui/shine-border";
import { useState } from "react";
import { MorphingText } from "@/components/magicui/morphing-text";
import { authService } from "../api/authService.js";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await authService.register(formData);
            console.log(response)
            if (response.data.success) {
                navigate("/login");
            }
        } catch (error) {
            console.log("Inside Signup.jsx : ", error);
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

    const texts = [
        "Welcome Back",
        "Stay Focused",
        "Get Productive",
        "Plan Smart",
        "Work Better",
        "Stay Organized",
        "Track Progress",
        "Manage Tasks",
        "Achieve More",
        "Boost Efficiency",
    ];

    return (
        <div className="w-full min-h-screen bg-black text-white flex flex-col items-center gap-10 justify-center">
            <MorphingText texts={texts} />

            <Card className="relative overflow-hidden max-w-[350px] w-full">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <CardHeader className={"flex items-center justify-between"}>
                    <div className="flex flex-col gap-2">
                        <CardTitle>SignUp</CardTitle>
                        <CardDescription>Create an account to continue</CardDescription>
                    </div>

                    <NavLink className={"font-semibold"} to={"/login"}>Login</NavLink>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleOnChange}
                                    id="name"
                                    type="text"
                                    placeholder="Name..."
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleOnChange}
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleOnChange}
                                    id="password"
                                    type="password"
                                    placeholder="password..."
                                />
                            </div>
                        </div>

                        <CardFooter className={"mt-10"}>
                            <Button type="submit" className="w-full cursor-pointer">
                                {loading ? <div className="loader"></div> : "SignUp"}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>

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

export default Signup;
