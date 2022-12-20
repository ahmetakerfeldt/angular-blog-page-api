"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("../../auth/middleware/auth.middleware");
const home_service_1 = require("../services/home.service");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/posts');
    },
    filename: function (req, file, cb) {
        const originalNameArr = file.originalname.split('.');
        const ext = originalNameArr[originalNameArr.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('', upload.single('video'), auth_middleware_1.AuthMiddleware, (req, res) => {
    res.json(req.file.filename);
});
router.post('/content', auth_middleware_1.AuthMiddleware, (req, res) => {
    return home_service_1.HomeService.postContentForVideo(req).then(() => {
        res.json('ok');
    });
});
exports.default = router;
