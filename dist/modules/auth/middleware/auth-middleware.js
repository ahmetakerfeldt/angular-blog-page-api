"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authGuard = function (res, req, next) {
    var _a;
    const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!token) {
        return res.status(404).send('Unauthorized');
    }
    const payload = jsonwebtoken_1.default.decode(token);
    if (!payload || )
        ;
};
exports.authGuard = authGuard;
