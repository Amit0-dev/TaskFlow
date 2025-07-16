import { elementService } from "@/api/elementService";
import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Element = () => {
    const { tagId } = useParams();
    const [searchParams] = useSearchParams();

    const elemEditTrigger = useRef();

    const tagName = searchParams.get("name");
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);

    const [elemTitle, setElemTitle] = useState("");
    const [elemUrl, setElemUrl] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // for delete animation btn
    const [clickedElem, setClickedElem] = useState(null);

    // for updating elemTitle and elemUrl
    const [updatedElemTitle, setUpdatedElemTitle] = useState("");
    const [updatedElemUrl, setUpdatedElemUrl] = useState("");

    // for element
    const handleCreateElem = async () => {
        setLoading(true);
        const elemData = {
            title: elemTitle,
            content: elemUrl,
            tagId,
        };
        try {
            const response = await elementService.createElement(elemData);
            if (response.data.success) {
                const response = await elementService.getElementsByTagId(tagId);
                if (response.data.success) {
                    setElements(response.data.elemDocs);
                }
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
            setIsOpen(false);
        }
    };
    const handleUpdateElem = async (id) => {
        setLoading(true);
        const elemData = {
            title: updatedElemTitle,
            content: updatedElemUrl,
            tagId,
        };
        try {
            const response = await elementService.updateElement(id, elemData);
            if (response.data.success) {
                const response = await elementService.getElementsByTagId(tagId);
                if (response.data.success) {
                    setElements(response.data.elemDocs);
                }
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

    const handleElemDelete = async (id) => {
        setClickedElem(id);
        setLoading(true);
        try {
            const response = await elementService.deleteElement(id);
            if (response.data.success) {
                const response = await elementService.getElementsByTagId(tagId);
                if (response.data.success) {
                    setElements(response.data.elemDocs);
                }
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

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const response = await elementService.getElementsByTagId(tagId);

                if (response.data.success) {
                    setElements(response.data.elemDocs);

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

        if (tagId) {
            init();
        }
    }, [tagId]);

    return tagId === undefined ? (
        <div className="w-full h-full flex items-center justify-center">
            <h2 className="text-8xl text-gray-600 font-semibold tracking-wider">
                Keep<span className="text-yellow-400">.in</span>
            </h2>
        </div>
    ) : (
        <div className="w-full">
            <div className="bg-gray-900 w-full h-[70px] px-10 rounded-xl flex items-center">
                <div>
                    <p className="font-medium tracking-wider text-red-400">Tagname: {tagName}</p>
                    <p className="font-medium tracking-wider text-orange-300">
                        NoOfElement: {elements.length}
                    </p>
                </div>

                {/* <div className="flex items-end flex-col">
                    <p className="font-medium tracking-wider text-green-400">Done: 5</p>
                    <p className="font-medium tracking-wider text-yellow-500">Pending: 12</p>
                </div> */}
            </div>

            <div className="h-[calc(100%-70px)] w-full">
                <div className="w-full h-[70px] flex items-center justify-end px-10">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <form>
                            <DialogTrigger asChild>
                                <button className="bg-white px-10 py-2 text-black font-semibold rounded-xl hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer">
                                    Add Element
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add Element</DialogTitle>
                                    <DialogDescription className={"font-semibold text-red-400"}>
                                        For Now you can only add links <br />
                                        Support for files and images will come in -{" "}
                                        <span className="text-blue-500 font-bold">V2</span>
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            placeholder="Enter title..."
                                            value={elemTitle}
                                            onChange={(e) => setElemTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="url">URL</Label>
                                        <Input
                                            id="url"
                                            name="url"
                                            placeholder="https://www.google.com"
                                            value={elemUrl}
                                            onChange={(e) => setElemUrl(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="button" onClick={handleCreateElem}>
                                        {loading ? (
                                            <div className="loader"></div>
                                        ) : (
                                            <>Save changes</>
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
                </div>

                {/* element wrapper  */}
                <div className="w-full h-[calc(100%-70px)] overflow-x-scroll flex flex-col gap-5  scrollbar-hide px-10 pt-5">
                    {/* elements  */}
                    {elements.length <= 0 ? (
                        <div className="text-center font-semibold text-gray-400 text-xl">
                            Elements not created till now !
                        </div>
                    ) : (
                        elements.map((ele) => (
                            <div
                                key={ele?._id}
                                className="w-full py-2 px-10 bg-gray-900 rounded-xl flex items-center justify-between"
                            >
                                <div className="flex gap-3 w-[90%]">
                                    {/* <input type="checkbox" name="done" id="done" /> */}
                                    <div>
                                        <p className="text-md font-medium text-gray-300 pb-2">
                                            {ele?.title}
                                        </p>
                                        <a
                                            className="text-yellow-500"
                                            target="_blank"
                                            href={ele?.content}
                                        >
                                            {ele?.content}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 w-[10%]">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUpdatedElemTitle(ele?.title || "");
                                            setUpdatedElemUrl(ele?.content || "");

                                            // Open dialog after state is set
                                            requestAnimationFrame(() => {
                                                elemEditTrigger.current?.click();
                                            });
                                        }}
                                    >
                                        <FiEdit className="cursor-pointer" />
                                    </button>

                                    <Dialog>
                                        <form>
                                            <DialogTrigger asChild>
                                                <button
                                                    ref={elemEditTrigger}
                                                    type="button"
                                                    style={{ display: "none" }}
                                                    aria-hidden="true"
                                                />
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Update Element</DialogTitle>
                                                    <DialogDescription
                                                        className={"font-semibold text-red-400"}
                                                    >
                                                        For Now you can only add links <br />
                                                        Support for files and images will come in -{" "}
                                                        <span className="text-blue-500 font-bold">
                                                            V2
                                                        </span>
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4">
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="title">Title</Label>
                                                        <Input
                                                            id="title"
                                                            name="title"
                                                            placeholder="Enter title..."
                                                            value={updatedElemTitle}
                                                            onChange={(e) =>
                                                                setUpdatedElemTitle(e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="url">URL</Label>
                                                        <Input
                                                            id="url"
                                                            name="url"
                                                            placeholder="https://www.google.com"
                                                            value={updatedElemUrl}
                                                            onChange={(e) =>
                                                                setUpdatedElemUrl(e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                    <Button
                                                        type="button"
                                                        onClick={() => handleUpdateElem(ele?._id)}
                                                    >
                                                        {loading ? (
                                                            <div className="loader"></div>
                                                        ) : (
                                                            <>Save changes</>
                                                        )}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </form>
                                    </Dialog>

                                    {clickedElem === ele?._id ? (
                                        <div className="loader"></div>
                                    ) : (
                                        <MdDelete
                                            onClick={() => handleElemDelete(ele?._id)}
                                            className="cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Element;
