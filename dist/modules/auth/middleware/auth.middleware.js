"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_entity_1 = require("../../../models/user/user.entity");
const AuthMiddleware = function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!token) {
            return res.status(404).send('Unauthorized');
        }
        const payload = jsonwebtoken_1.default.decode(token);
        if (!payload || !payload.id) {
            return res.status(404).send('Unauthorized');
        }
        const user = yield user_entity_1.UserModel.scope('withPassword').findByPk(payload.id);
        if (!user) {
            return res.status(404).send('Unauthorized');
        }
        req.user = user;
        next();
    });
};
exports.AuthMiddleware = AuthMiddleware;
