const multer = require("multer");
const uniqueId = require("./uniqueId");

const path = require("path");
const uploadPath = "public/";

const allowedMimeTypes = ["image/jpeg", "image/png"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `media_${uniqueId()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Allowed file types are: jpeg, jpg, png"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
