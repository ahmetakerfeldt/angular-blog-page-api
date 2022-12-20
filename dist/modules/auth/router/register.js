"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("../services/auth.service");
const router = express_1.default.Router();
router.post('', (req, res) => {
    const body = req.body;
    return auth_service_1.AuthService.register(req.body).then(() => {
        res.json('You successfully registered.');
    }).catch((err) => {
        const error = err.errors.map((e) => e.message);
        res.status(403).json(error);
    });
});
exports.default = router;
