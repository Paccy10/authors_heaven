import multer from 'multer';

const storage = multer.diskStorage({
    destination: null,
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        req.fileValidationError = 'Unsupported file format';
        cb(null, false, req.fileValidationError);
    }
};

const upload = multer({
    storage,
    fileFilter
});

export default upload;
