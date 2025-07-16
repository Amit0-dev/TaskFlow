import "dotenv/config"
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        if (response) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
};

const deleteMediaOnCloudinary = async (publicId, resourceType = "image") => {
    try {
        if (!publicId) return null;

        await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (error) {
        throw new Error(error?.message || `Failed to delete ${resourceType} on Cloudinary`);
    }
};

const getPublicId = (url) => {
    return url.split("/")[7].split(".")[0];
};

export { uploadOnCloudinary, deleteMediaOnCloudinary, getPublicId };
