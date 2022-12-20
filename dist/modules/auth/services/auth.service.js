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
exports.AuthService = void 0;
const user_entity_1 = require("../../../models/user/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_entity_1 = require("../../../models/admin/admin.entity");
exports.AuthService = new class {
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_entity_1.UserModel.create({ mail: body.mail, username: body.username, password: body.password });
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield admin_entity_1.AdminModel.findOrCreate({
                where: {
                    sender: 'System',
                    content: "You haven't created a post yet. Click to create a post!",
                    pp: 'morde.jpg',
                }
            });
            const user = yield user_entity_1.UserModel.scope('withPassword').findOne({ where: { mail: body.mail } });
            if (!user) {
                throw new Error('User not found.');
            }
            const { password } = user.toJSON();
            const comparePassword = yield bcryptjs_1.default.compare(body.password, password);
            if (!comparePassword) {
                throw new Error('User not found.');
            }
            return user;
        });
    }
};
