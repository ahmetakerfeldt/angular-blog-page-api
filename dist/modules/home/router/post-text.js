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
    return home_service_1.HomeService.postText(req).then(() => {
        res.json('ok');
    }).catch((err) => {
        if (!(err === null || err === void 0 ? void 0 : err.errs) || !err.erros.length) {
            res.status(400).send(`${err}`);
        }
    });
});
exports.default = router;
