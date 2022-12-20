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
exports.HomeService = void 0;
const posts_entity_1 = require("../../../models/posts/posts.entity");
const post_likes_entity_1 = require("../../../models/posts/post-likes.entity");
exports.HomeService = new class {
    postContent(req) {
        const { user, body } = req;
        return posts_entity_1.PostsModel.create({
            imagePath: body.path,
            content: body.content,
            userId: user.id,
            sender: user.username,
            type: "1",
            title: '',
            pp: user.imagePath
        });
    }
    postContentForVideo(req) {
        const { user, body } = req;
        if (!body) {
            throw new Error('Upload a image!');
        }
        return posts_entity_1.PostsModel.create({
            videoPath: body.path,
            content: body.content,
            userId: user.id,
            sender: user.username,
            type: "2",
            title: '',
            pp: user.imagePath
        });
    }
    allPosts(req) {
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
                ], order: [['createdAt', 'DESC']]
            });
        });
    }
    postText(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body } = req;
            if (body.content == "") {
                throw new Error('Please enter content!');
            }
            return posts_entity_1.PostsModel.create({
                content: body.content,
                userId: user.id,
                type: "0",
                sender: user.username,
                pp: user.imagePath
            });
        });
    }
    getPost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, query, body } = req;
            return posts_entity_1.PostsModel.findByPk(body.id, {
                include: [
                    {
                        model: post_likes_entity_1.PostsLikesModel,
                        required: false,
                        where: {
                            userId: user.id,
                        }
                    }
                ]
            });
        });
    }
    likePost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body } = req;
            const likes = yield post_likes_entity_1.PostsLikesModel.findOne({
                where: {
                    userId: user.id,
                    postId: body.postId,
                    sender: user.username
                }
            });
            if (likes) {
                return 'ok';
            }
            return post_likes_entity_1.PostsLikesModel.create({
                userId: user.id,
                postId: body.postId,
                sender: user.username
            }).then((post) => {
                return posts_entity_1.PostsModel.findByPk(body.postId).then((post) => {
                    const totalLikes = post.toJSON().likesCount + 1;
                    return posts_entity_1.PostsModel.update({ likesCount: totalLikes }, { where: { id: body.postId } });
                });
            });
        });
    }
    dislikePost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body } = req;
            const likes = yield post_likes_entity_1.PostsLikesModel.findOne({
                where: {
                    userId: user.id,
                    postId: body.postId,
                    sender: user.username
                }
            });
            if (!likes) {
                return 'ok';
            }
            return post_likes_entity_1.PostsLikesModel.destroy({
                where: {
                    userId: user.id,
                    postId: body.postId,
                    sender: user.username
                }
            }).then((post) => {
                return posts_entity_1.PostsModel.findByPk(body.postId).then((post) => {
                    const totalLikes = post.toJSON().likesCount - 1;
                    return posts_entity_1.PostsModel.update({ likesCount: totalLikes }, { where: { id: body.postId } });
                });
            });
        });
    }
    getLikes() {
        return __awaiter(this, void 0, void 0, function* () {
            return post_likes_entity_1.PostsLikesModel.findAll();
        });
    }
};
