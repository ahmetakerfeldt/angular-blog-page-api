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
exports.SettingsService = void 0;
const user_entity_1 = require("../../../models/user/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const posts_entity_1 = require("../../../models/posts/posts.entity");
const comments_entity_1 = require("../../../models/posts/comments.entity");
const responses_entity_1 = require("../../../models/posts/responses.entity");
const comments_likes_entity_1 = require("../../../models/posts/comments-likes.entity");
const post_likes_entity_1 = require("../../../models/posts/post-likes.entity");
exports.SettingsService = new class {
    changeUsername(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body } = req;
            const lastUsername = user.username;
            const userInfo = yield user_entity_1.UserModel.scope('withPassword').findByPk(user.id);
            const comparePassword = yield bcryptjs_1.default.compare(body.password, userInfo.toJSON().password);
            if (!comparePassword) {
                throw new Error('Password is not correct.');
            }
            const otherUser = yield user_entity_1.UserModel.findOne({ where: { username: body.username } });
            if (otherUser) {
                throw new Error('Username already taken!');
            }
            return userInfo.update({ username: body.username, password: body.password }).then(() => {
                return posts_entity_1.PostsModel.update({ sender: body.username }, { where: { userId: user.id } }).then(() => {
                    return posts_entity_1.PostsModel.create({
                        userId: user.id,
                        pp: user.imagePath,
                        type: '0',
                        sender: body.username,
                        content: `${lastUsername}, changed username to ${body.username}`
                    }).then(() => {
                        return comments_entity_1.CommentsModel.update({ sender: body.username }, { where: { sender: user.username } }).then(() => {
                            return responses_entity_1.ResponsesModel.update({ sender: body.username }, { where: { sender: user.username } });
                        }).then(() => {
                            return comments_likes_entity_1.CommentsLikesModel.update({ sender: body.username }, { where: { sender: user.username } });
                        }).then(() => {
                            return post_likes_entity_1.PostsLikesModel.update({ sender: body.username }, { where: { sender: user.username } });
                        });
                    });
                });
            });
        });
    }
    changePassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body } = req;
            const password = yield user_entity_1.UserModel.scope('withPassword').findByPk(user.id);
            const comparePassword = yield bcryptjs_1.default.compare(body.oldPassword, password.toJSON().password);
            if (!comparePassword) {
                throw new Error('Password is not correct.');
            }
            user.update({ password: body.newPassword });
        });
    }
};
