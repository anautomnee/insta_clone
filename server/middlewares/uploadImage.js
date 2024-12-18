import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, callback) => {
        // Allowed file extensions and MIME types
        const allowedFileTypes = ['image/svg', 'image/jpeg', 'image/jpg', 'image/png'];

        // Check MIME type
        if (allowedFileTypes.includes(file.mimetype)) {
            callback(null, true); // Accept the file
        } else {
            // Reject the file with an error
            callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only JPEG and PNG images are allowed!'));
        }
    }
});

export default upload