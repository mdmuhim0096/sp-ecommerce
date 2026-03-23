const cloudinary = require("../db/cloudinary");

/**
 * Delete a file from Cloudinary using its URL
 * @param {string} fileUrl - Full Cloudinary file URL
 * @returns {object} - { publicId, resourceType, result }
 */

async function fileDeleter(fileUrl) {
    if (!fileUrl) throw new Error("File URL is required");

    try {

        const cleanUrl = fileUrl.split("?")[0];

        const urlParts = cleanUrl.split("/");

        const uploadIndex = urlParts.findIndex(part => part === "upload");
        if (uploadIndex === -1) throw new Error("Invalid Cloudinary URL");

        const pathParts = urlParts.slice(uploadIndex + 1).filter(p => !/^v\d+$/.test(p));

        const lastPart = pathParts.pop();
        const fileNameWithoutExt = lastPart.split(".").slice(0, -1).join(".");
        const folderPath = pathParts.join("/");

        const publicId = folderPath ? `${folderPath}/${fileNameWithoutExt}` : fileNameWithoutExt;

        const resource_type = "image";

        // const ext = lastPart.split(".").pop().toLowerCase();
        // if (["mp4", "mpeg", "mov", "avi", "mkv"].includes(ext)) resourceType = "video";
        // else if (["mp3", "wav", "ogg", "aac"].includes(ext)) resourceType = "audio";
        // else if (["pdf", "doc", "docx", "xls", "xlsx", "txt"].includes(ext)) resourceType = "raw";

        await cloudinary.uploader.destroy(publicId, { resource_type });

    } catch (error) {
        throw new Error("Cloudinary delete failed: " + error.message);
    }
}

module.exports = fileDeleter;
