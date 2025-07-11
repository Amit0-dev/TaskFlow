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

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formData)
    }

    return (
        <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
            <Card className="relative overflow-hidden max-w-[350px] w-full">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <CardHeader>
                    <CardTitle>SignUp</CardTitle>
                    <CardDescription>Create an account to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Email</Label>
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
                            <Button type="submit" className="w-full cursor-pointer">SignUp</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;

