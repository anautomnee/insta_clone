import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, callback) => {
        if (file.fieldname !== 'photo') {
            return callback(new Error('Unexpected field for image')); // Reject unexpected fields
        }

        const allowedFileTypes = ['image/svg', 'image/svg+xml', 'image/jpeg', 'image/jpg', 'image/png'];

        if (allowedFileTypes.includes(file.mimetype)) {
            callback(null, true); // Accept the file
        } else {
            callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only JPEG and PNG images are allowed!'));
        }
    }
});

export default upload