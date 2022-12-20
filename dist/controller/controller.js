"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const fileDestinations = {
    POST_IMAGE: './assets/posts',
    POST_VIDEO: './assets/posts',
    USER_PROFILE_IMAGE: './assets/profile-photos',
    USER_COVER_IMAGE: './assets/cover-photos'
};
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const fileType = req.query.fileType;
        const fileDestinationPath = fileDestinations[fileType];
        if (!fileDestinationPath) {
            throw new Error('Invalid file type');
        }
        cb(null, fileDestinationPath);
        console.log(fileDestinationPath);
    },
    filename: function (req, file, cb) {
        const originalNameArr = file.originalname.split('.');
        const ext = originalNameArr[originalNameArr.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.uploader = upload.single(`image`);
