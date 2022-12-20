"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../auth/middleware/auth.middleware");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/profile-photos');
    },
    filename: function (req, file, cb) {
        const originalNameArr = file.originalname.split('.');
        const ext = originalNameArr[originalNameArr.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('', auth_middleware_1.AuthMiddleware, upload.single('image'), (req, res) => {
    return;
});
exports.default = router;
