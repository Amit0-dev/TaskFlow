import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Keep = () => {
    const tags = [
        "Javascript",
        "React",
        "Personal",
        "Frontend",
        "Watch Later Important",
        "Javascript",
        "React",
        "Personal",
        "Frontend",
        "Watch Later Important",
        "Javascript",
        "React",
        "Personal",
        "Frontend",
        "Watch Later Important",
    ];

    return (
        <div className="w-full h-[calc(100vh-90px)] flex">
            <div className="w-[20%] h-full border-r-2 bg-gray-900  p-5">
                <h2 className="font-semibold text-2xl border-b-2 pb-3 text-center ">Keep.in</h2>

                <div className="mt-10 flex items-center justify-center">
                    <button className="bg-white px-10 py-2 text-black font-semibold rounded-xl hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer">
                        Create Tag
                    </button>
                </div>

                <div className="mt-10 w-full h-4/6 flex flex-col gap-5 overflow-y-scroll scrollbar-hide">
                    {tags.map((tag) => (
                        <div
                            className="
                            px-2
                                flex gap-3 items-center justify-between
                                leading-5
                                 cursor-pointer transition-colors duration-300 text-gray-300 hover:text-white hover:bg-gray-800 hover:rounded-xl"
                            key={tag}
                        >
                            {tag}

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-[80%] h-full px-5">
                <div className="bg-gray-900 w-full h-[70px] px-10 rounded-xl flex justify-between items-center">
                    <div>
                        <p className="font-medium tracking-wider text-red-400">
                            Tagname: JavaScript
                        </p>
                        <p className="font-medium tracking-wider text-orange-300">
                            NoOfElement: 12
                        </p>
                    </div>

                    <div className="flex items-end flex-col">
                        <p className="font-medium tracking-wider text-green-400">Done: 5</p>
                        <p className="font-medium tracking-wider text-yellow-500">Pending: 12</p>
                    </div>
                </div>

                <div className="h-[calc(100%-70px)] w-full">
                    <div className="w-full h-[70px] flex items-center justify-end px-10">
                        <button className="bg-white px-10 py-2 text-black font-semibold rounded-xl hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer">
                            Add Element
                        </button>
                    </div>

                    {/* element wrapper  */}
                    <div className="w-full h-[calc(100%-70px)] overflow-x-scroll flex flex-col gap-5  scrollbar-hide px-10 pt-5">
                        {/* elements  */}
                        <div className="w-full py-2 px-5 bg-gray-900 rounded-xl flex items-center justify-between">
                            <div className="flex gap-5 w-[90%]">
                                <input type="checkbox" name="done" id="done" />
                                <div>
                                    <p className="text-md font-medium text-gray-300 pb-2">
                                        Content is everywhere, but we provide a learning experience
                                        that is unmatched — bounties, peer learning, code reviews,
                                        virtual hostel, alumni network, doubt sessions, and group
                                        projects.
                                    </p>
                                    <a
                                        className="text-yellow-500"
                                        target="_blank"
                                        href="https://www.google.com"
                                    >
                                        https://courses.chaicode.com/learn/home/Web-Dev-Cohort/Web-Dev-Cohort-Live/section/0/lesson/0/
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-5 w-[10%]">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full py-2 px-5 bg-gray-900 rounded-xl flex items-center justify-between">
                            <div className="flex gap-5">
                                <input type="checkbox" name="done" id="done" />
                                <div>
                                    <p>Title</p>
                                    <a target="_blank" href="www.google.com">
                                        www.google.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full py-2 px-5 bg-gray-900 rounded-xl flex items-center justify-between">
                            <div className="flex gap-5">
                                <input type="checkbox" name="done" id="done" />
                                <div>
                                    <p>Title</p>
                                    <a target="_blank" href="www.google.com">
                                        www.google.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full py-2 px-5 bg-gray-900 rounded-xl flex items-center justify-between">
                            <div className="flex gap-5">
                                <input type="checkbox" name="done" id="done" />
                                <div>
                                    <p>Title</p>
                                    <a target="_blank" href="www.google.com">
                                        www.google.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full py-2 px-5 bg-gray-900 rounded-xl flex items-center justify-between">
                            <div className="flex gap-5">
                                <input type="checkbox" name="done" id="done" />
                                <div>
                                    <p>Title</p>
                                    <a target="_blank" href="www.google.com">
                                        www.google.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full py-2 px-5 bg-gray-900 rounded-xl flex items-center justify-between">
                            <div className="flex gap-5">
                                <input type="checkbox" name="done" id="done" />
                                <div>
                                    <p>Title</p>
                                    <a target="_blank" href="www.google.com">
                                        www.google.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full py-2 px-5 bg-gray-900 rounded-xl flex items-center justify-between">
                            <div className="flex gap-5">
                                <input type="checkbox" name="done" id="done" />
                                <div>
                                    <p>Title</p>
                                    <a target="_blank" href="www.google.com">
                                        www.google.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full py-2 px-5 bg-gray-900 rounded-xl flex items-center justify-between">
                            <div className="flex gap-5">
                                <input type="checkbox" name="done" id="done" />
                                <div>
                                    <p>Title</p>
                                    <a target="_blank" href="www.google.com">
                                        www.google.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full py-2 px-5 bg-gray-900 rounded-xl flex items-center justify-between">
                            <div className="flex gap-5">
                                <input type="checkbox" name="done" id="done" />
                                <div>
                                    <p>Title</p>
                                    <a target="_blank" href="www.google.com">
                                        www.google.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full py-2 px-5 bg-gray-900 rounded-xl flex items-center justify-between">
                            <div className="flex gap-5">
                                <input type="checkbox" name="done" id="done" />
                                <div>
                                    <p>Title</p>
                                    <a target="_blank" href="www.google.com">
                                        www.google.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full py-2 px-5 bg-gray-900 rounded-xl flex items-center justify-between">
                            <div className="flex gap-5">
                                <input type="checkbox" name="done" id="done" />
                                <div>
                                    <p>Title</p>
                                    <a target="_blank" href="www.google.com">
                                        www.google.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <FiEdit className="cursor-pointer" />
                                <MdDelete className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Keep;
