import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import "react-calendar-heatmap/dist/styles.css";
import StreakHeatmap from "@/customComponents/StreakHeatMap";
import Chart from "@/customComponents/Chart";
import useAuthStore from "@/store/useAuthStore";

const Home = () => {
    console.log("Home Run...");
    const sampleData = [
        { date: "2025-07-01", status: "Completed", count: 5 },
        { date: "2025-07-02", status: "Partial", count: 2 },
        { date: "2025-07-03", status: "None", count: 0 },
    ];

    const user = useAuthStore((state) => state.userData);

    return (
        <div className="w-full text-gray-300 pb-10">
            <div className="w-full flex flex-col items-end justify-center gap-1 h-22 p-10 ">
                <h4 className="font-medium text-xl tracking-wide">Streak: 🔥</h4>
                <h4 className="font-medium text-lg tracking-wide">{`Hey 👋 ${user?.name}`}</h4>
                <h4 className="font-medium tracking-wider">📆 July 11</h4>
            </div>

            <div className="w-full ">
                <div className="flex flex-col gap-1 mb-5">
                    <label className="font-semibold" htmlFor="todo">
                        Todo :
                    </label>
                    <div className="flex gap-7">
                        <input
                            className="border-2 border-yellow-400 w-1/2 rounded-md py-2 px-5 outline-none font-medium tracking-wide"
                            type="text"
                            placeholder="Write your tasks..."
                        />

                        <button className="bg-gray-300 px-6 py-2 text-black font-semibold rounded-md hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer">
                            Create
                        </button>
                    </div>
                </div>
                <h3 className="font-semibold text-2xl ">Today's Tasks :</h3>

                {/* task list  */}
                <div className="flex">
                    <div className="w-1/2 h-92 pt-8 overflow-y-scroll scrollbar-hide flex flex-col gap-3 pr-5">
                        <div className="flex justify-between bg-gray-900 items-center p-4 rounded-xl text-white">
                            <div className="flex gap-5">
                                <input type="checkbox" name="complete" id="complete" />
                                <div>
                                    Do Exercise Daily Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Eius, tenetur?
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-900 items-center p-4 rounded-xl text-white">
                            <div className="flex gap-5">
                                <input type="checkbox" name="complete" id="complete" />
                                <div>
                                    Do Exercise Daily Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Eius, tenetur?
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-900 items-center p-4 rounded-xl text-white">
                            <div className="flex gap-5">
                                <input type="checkbox" name="complete" id="complete" />
                                <div>
                                    Do Exercise Daily Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Eius, tenetur?
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-900 items-center p-4 rounded-xl text-white">
                            <div className="flex gap-5">
                                <input type="checkbox" name="complete" id="complete" />
                                <div>
                                    Do Exercise Daily Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Eius, tenetur?
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-900 items-center p-4 rounded-xl text-white">
                            <div className="flex gap-5">
                                <input type="checkbox" name="complete" id="complete" />
                                <div>
                                    Do Exercise Daily Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Eius, tenetur?
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-900 items-center p-4 rounded-xl text-white">
                            <div className="flex gap-5">
                                <input type="checkbox" name="complete" id="complete" />
                                <div>
                                    Do Exercise Daily Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Eius, tenetur?
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-900 items-center p-4 rounded-xl text-white">
                            <div className="flex gap-5">
                                <input type="checkbox" name="complete" id="complete" />
                                <div>
                                    Do Exercise Daily Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Eius, tenetur?
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-900 items-center p-4 rounded-xl text-white">
                            <div className="flex gap-5">
                                <input type="checkbox" name="complete" id="complete" />
                                <div>
                                    Do Exercise Daily Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Eius, tenetur?
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-900 items-center p-4 rounded-xl text-white">
                            <div className="flex gap-5">
                                <input type="checkbox" name="complete" id="complete" />
                                <div>
                                    Do Exercise Daily Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Eius, tenetur?
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-900 items-center p-4 rounded-xl text-white">
                            <div className="flex gap-5">
                                <input type="checkbox" name="complete" id="complete" />
                                <div>
                                    Do Exercise Daily Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Eius, tenetur?
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2 h-92 pb-10 flex items-center justify-center cursor-pointer gap-14">
                        <Chart labels={["Completed", "Uncompleted"]} counts={[80, 20]} />

                        <div className="flex flex-col gap-5 items-start">
                            <h4 className="flex gap-1 items-center justify-center  font-semibold">
                                <div className="w-4 h-4 bg-red-400 rounded-2xl"></div>: Completed
                            </h4>
                            <h4 className="flex gap-1 items-center justify-center  font-semibold">
                                <div className="w-4 h-4 bg-yellow-500 rounded-2xl"></div>:
                                Uncompleted
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full mt-20">
                <h3 className="text-center text-3xl font-semibold mb-5 capitalize">
                    Your Past 6 Months of Activity
                </h3>
                <StreakHeatmap data={sampleData} />
            </div>
        </div>
    );
};

export default Home;
