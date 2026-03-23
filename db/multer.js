const multer = require("multer");

// Store file in memory as a buffer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ext = allowed.test(file.originalname.toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error("Only images are allowed!"));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
