"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../auth/middleware/auth.middleware");
const settings_service_1 = require("../services/settings.service");
const router = express_1.default.Router();
router.patch('', auth_middleware_1.AuthMiddleware, (req, res) => {
    return settings_service_1.SettingsService.changeUsername(req).then(() => {
        res.json('You successfully change username');
    }).catch((err) => {
        if (!(err === null || err === void 0 ? void 0 : err.errs) || !err.erros.length) {
            res.status(400).send(`${err}`);
        }
    });
});
exports.default = router;
