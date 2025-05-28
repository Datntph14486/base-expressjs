import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/upload");
    },
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

export default upload;
