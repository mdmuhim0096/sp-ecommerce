const cloudinary = require("../db/cloudinary");

function uploadToCloudinary(buffer, folder = "products", resourceType = "image") {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: resourceType },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary error:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(buffer);
    });
}

module.exports = uploadToCloudinary;