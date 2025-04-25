import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: Infinity },
}).fields([
    { name: "notes", maxCount: 10 }, 
    { name: "video", maxCount: 10 } 
]);