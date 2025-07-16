import { authService } from "@/api/authService";
import useAuthStore from "@/store/useAuthStore";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
    const [localFileUrlForPreview, setLocalFileUrlForPreview] = useState(null);
    const [localFileUrl, setLocalFileUrl] = useState(null);

    const [isEditClicked, setIsEditClicked] = useState(false);

    const [loading, setLoading] = useState(false);

    const user = useAuthStore((state) => state.userData);
    const setUserData = useAuthStore((state) => state.setUserData);

    const handleUploadProfile = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            if (localFileUrl) {
                formData.append("profileImage", localFileUrl);
            }

            const response = await authService.uploadProfile(formData);
            if (response.data.success) {
                setUserData(response.data.user);
                setLocalFileUrlForPreview(null);

                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
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

    const handleDeleteProfile = async () => {
        setLoading(true);
        try {
            const response = await authService.deleteProfile();
            if (response.data.success) {
                setUserData(response.data.user);

                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
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
            setIsEditClicked(false)
        }
    };

    return (
        <div className="w-full h-[calc(100vh-90px)]">
            <div className="w-full h-1/2  flex">
                <div className="w-[30%] h-full  flex flex-col gap-5 items-center justify-end">
                    {user?.profile ? (
                        <div className={` w-50 h-50 rounded-full cursor-pointer`}>
                            <div className="w-50 h-50 overflow-hidden rounded-full">
                                <img
                                    className="w-full h-full object-cover"
                                    src={user?.profile}
                                    alt=""
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`relative w-50 h-50 rounded-full border-4 ${
                                localFileUrlForPreview ? "border-none" : "border-yellow-400"
                            } cursor-pointer group`}
                        >
                            {/* Hidden file input */}
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setLocalFileUrl(file);
                                    if (file) {
                                        setLocalFileUrlForPreview(URL.createObjectURL(file));
                                    }
                                }}
                            />

                            {/* Label acts as clickable area */}
                            {localFileUrlForPreview ? (
                                <div className="w-50 h-50 overflow-hidden rounded-full">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={localFileUrlForPreview}
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
                    )}

                    <div className="flex gap-5 items-center justify-center">
                        {user?.profile && !isEditClicked ? (
                            <button
                                onClick={() => setIsEditClicked(true)}
                                className="bg-white px-6 py-2 text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer"
                            >
                                Edit
                            </button>
                        ) : (
                            !isEditClicked && (
                                <button
                                    onClick={handleUploadProfile}
                                    className="bg-white px-6 py-2 text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer"
                                >
                                    {loading ? "Uploading..." : "Upload"}
                                </button>
                            )
                        )}
                        {localFileUrlForPreview && (
                            <button
                                onClick={() => setLocalFileUrlForPreview(null)}
                                className="bg-white px-6 py-2 text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer"
                            >
                                Clear
                            </button>
                        )}

                        {isEditClicked && (
                            <button
                                onClick={handleDeleteProfile}
                                className="bg-white px-6 py-2 text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer"
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        )}
                        {isEditClicked && (
                            <button
                                onClick={() => setIsEditClicked(false)}
                                className="bg-white px-6 py-2 text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer"
                            >
                                Cancle
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

export default Dashboard;
