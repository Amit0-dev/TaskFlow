import React from "react";

const Keep = () => {
    const tags = ["Javascript", "React", "Personal", "Frontend"];

    return (
        <div className="w-full h-[calc(100vh-90px)] flex">
            <div className="w-[20%] border-r-2 bg-gray-900  p-5">
                <h2 className="font-semibold text-2xl border-b-2 pb-3 text-center ">Keep.in</h2>

                <div className="mt-10 flex items-center justify-center">
                    <button className="bg-white px-10 py-2 text-black font-semibold rounded-xl hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer">
                        Create Tag
                    </button>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    {tags.map((tag) => (
                        <button
                            className="hover:scale-110 cursor-pointer transform duration-300 text-gray-300 hover:text-white hover:bg-gray-800 hover:rounded-xl"
                            key={tag}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-[80%] px-5">
                <div className="bg-gray-900 py-2 px-10 rounded-xl flex justify-between items-center">
                    <div>
                        <p className="font-medium tracking-wider text-red-400">Tagname: JavaScript</p>
                        <p className="font-medium tracking-wider text-orange-300">NoOfElement: 12</p>
                    </div>

                    <div className="flex items-end flex-col">
                        <p className="font-medium tracking-wider text-green-400">Done: 5</p>
                        <p className="font-medium tracking-wider text-yellow-500">Pending: 12</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Keep;
