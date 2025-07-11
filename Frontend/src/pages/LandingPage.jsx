import { useEffect, useRef } from "react";
import Typed from "typed.js";
import Navbar from "../customComponents/Navbar.jsx";

const LandingPage = () => {
    const typed = useRef(null);
    const el = useRef(null);

    useEffect(() => {
        const options = {
            strings: ["Stay focused", "Stay consistent", "One task at a time"],
            typeSpeed: 50, // Decrease for faster typing
            backSpeed: 30, // Decrease for faster backspacing
            startDelay: 500, // Delay before typing starts
            backDelay: 1000, // Delay before backspacing
            loop: true,
            smartBackspace: true, // Only backspace what's necessary
            showCursor: false,
        };

        // Initialize Typed.js
        if (el.current) {
            typed.current = new Typed(el.current, options);
        }

        // Cleanup on unmount
        return () => {
            if (typed.current) {
                typed.current.destroy();
            }
        };
    }, []);

    return (
        <div className="w-full bg-black text-white px-30">

            <div className="pt-20 flex flex-col items-center gap-8 h-40">
                <h1 className="text-7xl text-center font-bold">
                    Welcome To Task<span className="text-yellow-400">Flow</span>
                </h1>

                <span
                    ref={el}
                    className="text-gray-600 text-5xl font-bold min-[1900px]:text-5xl max-[500px]:text-2xl"
                />
            </div>

            <div className=" h-50 w-[80%] mx-auto mt-20 p-20">
                <h6 className="text-lg text-center text-gray-400">
                    Your personal space to plan, organize, and conquer your day. Start by creating
                    your first task and take control of your productivity—one step at a time.
                </h6>
            </div>
        </div>
    );
};

export default LandingPage;
