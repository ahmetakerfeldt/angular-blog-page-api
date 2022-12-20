"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../auth/middleware/auth.middleware");
const home_service_1 = require("../services/home.service");
const router = express_1.default.Router();
router.post('', auth_middleware_1.AuthMiddleware, (req, res) => {
    return home_service_1.HomeService.getPost(req).then((post) => {
        res.json(post);
    });
});
exports.default = router;
