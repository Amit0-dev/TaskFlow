import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
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
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { tagService } from "@/api/tagService";
import { useKeepStore } from "@/store/useKeepStore";
import Element from "@/customComponents/Element";
import { useNavigate } from "react-router-dom";

const Keep = () => {
    // all tags
    const tags = useKeepStore((state) => state.tags);
    const setTags = useKeepStore((state) => state.setTags);
    const fetchTagAndSet = useKeepStore((state) => state.fetchTagAndSet);

    const [tagName, setTagName] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // for updating tagName
    const [updatedTagName, setUpdatedTagName] = useState("");

    const handleCreateTag = async () => {
        setLoading(true);

        const tagData = {
            tagName,
        };
        try {
            if (tagName.length > 15) {
                throw Error("Max 15 Characters are allowed");
            }

            const response = await tagService.createTag(tagData);
            if (response.data.success) {
                const response = await tagService.getAllTags();
                if (response.data.success) {
                    setTags(response.data.tags);
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

    const handleUpdateTag = async (tagId) => {
        setLoading(true);
        const tagData = {
            tagName: updatedTagName,
        };
        try {
            const response = await tagService.updateTag(tagId, tagData);
            if (response.data.success) {
                const response = await tagService.getAllTags();
                if (response.data.success) {
                    setTags(response.data.tags);
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

    const handleDeleteTag = async (tagId) => {
        setLoading(true);
        try {
            const response = await tagService.deleteTag(tagId);
            if (response.data.success) {
                const response = await tagService.getAllTags();
                if (response.data.success) {
                    setTags(response.data.tags);
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
        fetchTagAndSet();
    }, []);

    return (
        <div className="w-full h-[calc(100vh-90px)] flex">
            <div className="w-[20%] h-full border-r-2 bg-gray-900  p-5">
                <h2 className="font-semibold text-2xl border-b-2 pb-3 text-center ">Keep.in</h2>

                <div className="mt-10 flex items-center justify-center">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <form>
                            <DialogTrigger asChild>
                                <button className="bg-white px-10 py-2 text-black font-semibold rounded-xl hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer">
                                    Create Tag
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create Tag</DialogTitle>
                                    <DialogDescription>
                                        TagName is basically a folder that contain file or elements:
                                        <span className="text-red-500 font-semibold ml-5">
                                            Max Characters : 15
                                        </span>
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="tagName">Name</Label>
                                        <Input
                                            id="tagName"
                                            name="tagName"
                                            placeholder="Enter tagname..."
                                            value={tagName}
                                            onChange={(e) => setTagName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="button" onClick={handleCreateTag}>
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

                <div className="mt-10 w-full h-4/6 flex flex-col gap-5 overflow-y-scroll scrollbar-hide">
                    {tags.map((tag) => (
                        <div
                            className="
                            px-2
                                flex gap-3 items-center justify-between
                                
                                  transition-colors duration-300 text-gray-300 hover:text-white hover:bg-gray-800 hover:rounded-xl"
                            key={tag?._id}
                        >
                            <h4
                                onClick={() => navigate(`/keep/${tag?._id}?name=${tag?.tagName}`)}
                                className="leading-5 font-medium cursor-pointer"
                            >
                                {tag?.tagName}
                            </h4>

                            <div className="flex gap-5">
                                <Dialog>
                                    <form>
                                        <DialogTrigger asChild>
                                            <FiEdit className="cursor-pointer" />
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Update Tag</DialogTitle>
                                                <DialogDescription>
                                                    TagName is basically a folder that contain file
                                                    or elements
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="tagName">TagName</Label>
                                                    <Input
                                                        id="tagName"
                                                        name="tagName"
                                                        placeholder="Enter tagname..."
                                                        value={updatedTagName}
                                                        onChange={(e) =>
                                                            setUpdatedTagName(e.target.value)
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
                                                    onClick={() => handleUpdateTag(tag?._id)}
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

                                <MdDelete
                                    onClick={() => handleDeleteTag(tag?._id)}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-[80%] h-full px-5">
                <Element />
            </div>

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

export default Keep;
