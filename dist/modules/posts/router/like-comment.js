"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../auth/middleware/auth.middleware");
const post_service_1 = require("../services/post.service");
const router = express_1.default.Router();
router.post('', auth_middleware_1.AuthMiddleware, (req, res) => {
    return post_service_1.PostService.likeComment(req).then(() => {
        res.json('ok');
    });
});
router.get('/all', auth_middleware_1.AuthMiddleware, (req, res) => {
    return post_service_1.PostService.getLikes().then((data) => {
        res.json(data);
    });
});
exports.default = router;
