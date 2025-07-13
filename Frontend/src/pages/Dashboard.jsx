import useAuthStore from "@/store/useAuthStore";
import React, { useState } from "react";

const Dashboard = () => {
    const [localFileUrl, setLocalFileUrl] = useState(null);
    const user = useAuthStore((state) => state.userData);

    return (
        <div className="w-full h-[calc(100vh-90px)]">
            <div className="w-full h-1/2  flex">
                <div className="w-[30%] h-full  flex flex-col gap-5 items-center justify-end">
                    <div
                        className={`relative w-50 h-50 rounded-full border-4 ${
                            localFileUrl ? "border-none" : "border-yellow-400"
                        } cursor-pointer group`}
                    >
                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setLocalFileUrl(URL.createObjectURL(file));
                                }
                            }}
                        />

                        {/* Label acts as clickable area */}
                        {localFileUrl ? (
                            <div className="w-50 h-50 overflow-hidden rounded-full">
                                <img
                                    className="w-full h-full object-cover"
                                    src={localFileUrl}
                                    alt=""
                                />
                            </div>
                        ) : (
                            <label
                                htmlFor="fileInput"
                                className="absolute inset-0 flex items-center justify-center text-5xl text-yellow-400 group-hover:bg-gray-900  rounded-full transition-colors duration-200 group-hover:cursor-pointer"
                            >
                                +
                            </label>
                        )}
                    </div>

                    <div className="flex gap-5 items-center justify-center">
                        <button className="bg-white px-6 py-2 text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer">
                            Upload
                        </button>
                        {localFileUrl && (
                            <button
                                onClick={() => setLocalFileUrl(null)}
                                className="bg-white px-6 py-2 text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
                <div className="w-[70%] h-full  flex justify-between items-center gap-3 text-gray-400 ">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-semibold tracking-wider">
                            Name: <span className="text-white ml-5">{user?.name}</span>
                        </h2>
                        <h2 className="text-xl font-semibold tracking-wider">
                            Email: <span className="text-white ml-5">{user?.email}</span>
                        </h2>
                        <h2 className="text-xl font-semibold tracking-wider">
                            TotalTaskDone: <span></span>
                        </h2>
                        <h2 className="text-xl font-semibold tracking-wider">
                            TotalTaskAssign: <span></span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-yellow-500 font-semibold">📚 Keep.in Summary</h2>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold tracking-wider">
                                UnCoveredElement: <span></span>
                            </h2>
                            <h2 className="text-xl font-semibold tracking-wider">
                                TotalElement: <span></span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* you can do more here in this section  */}
            <div className="w-full h-1/2"></div>
        </div>
    );
};

export default Dashboard;
