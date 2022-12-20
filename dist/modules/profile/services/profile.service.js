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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const posts_entity_1 = require("../../../models/posts/posts.entity");
const user_entity_1 = require("../../../models/user/user.entity");
const admin_entity_1 = require("../../../models/admin/admin.entity");
const comments_entity_1 = require("../../../models/posts/comments.entity");
const responses_entity_1 = require("../../../models/posts/responses.entity");
const post_likes_entity_1 = require("../../../models/posts/post-likes.entity");
exports.ProfileService = new class {
    userPosts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            return posts_entity_1.PostsModel.findAll({
                include: [
                    {
                        model: post_likes_entity_1.PostsLikesModel,
                        required: false,
                        where: {
                            userId: user.id,
                        }
                    }
                ], where: { userId: user.id }, order: [['createdAt', 'DESC']]
            });
        });
    }
    deletePost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, user } = req;
            return posts_entity_1.PostsModel.destroy({ where: { id: body.id, userId: user.id } });
        });
    }
    getUserInfo(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            return user_entity_1.UserModel.findOne({ where: { id: user.id }, attributes: { exclude: ['id'] } });
        });
    }
    getSystem() {
        return __awaiter(this, void 0, void 0, function* () {
            return admin_entity_1.AdminModel.findOne({ where: { sender: 'System' } });
        });
    }
    updateProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body } = req;
            return user_entity_1.UserModel.update(body, { where: { id: user.id } }).then(() => {
                return posts_entity_1.PostsModel.update({ pp: body.imagePath }, { where: { userId: user.id } }).then(() => {
                    return posts_entity_1.PostsModel.create({
                        userId: user.id,
                        content: `${user.username}, changed profile photo`,
                        type: '1',
                        pp: body.imagePath,
                        sender: user.username,
                        imagePath: body.imagePath,
                        title: 'ok'
                    }).then(() => {
                        return comments_entity_1.CommentsModel.update({ pp: body.imagePath }, { where: { userId: user.id } }).then(() => {
                            return responses_entity_1.ResponsesModel.update({ pp: body.imagePath }, { where: { userId: user.id } });
                        });
                    });
                });
            });
        });
    }
    editPost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body, query } = req;
            return posts_entity_1.PostsModel.update({
                imagePath: body.imagePath,
                videoPath: body.videoPath,
                createdAt: body.createdAt,
                content: body.content,
            }, { where: { id: body.id } });
        });
    }
};
