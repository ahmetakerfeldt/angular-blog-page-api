"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../auth/middleware/auth.middleware");
const controller_1 = require("../../../controller/controller");
const router = express_1.default.Router();
router.post('/upload', auth_middleware_1.AuthMiddleware, controller_1.uploader, (req, res) => {
    res.json({ path: req.file.filename });
});
exports.default = router;
