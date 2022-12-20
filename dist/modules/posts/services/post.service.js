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
exports.PostService = void 0;
const posts_entity_1 = require("../../../models/posts/posts.entity");
const blogs_entity_1 = require("../../../models/posts/blogs.entity");
const comments_entity_1 = require("../../../models/posts/comments.entity");
const responses_entity_1 = require("../../../models/posts/responses.entity");
const comments_likes_entity_1 = require("../../../models/posts/comments-likes.entity");
const user_entity_1 = require("../../../models/user/user.entity");
const post_likes_entity_1 = require("../../../models/posts/post-likes.entity");
exports.PostService = new class {
    getVideos(req) {
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
                ], where: { type: '2' }, order: [['createdAt', 'DESC']]
            });
        });
    }
    getPhotos(req) {
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
                ], where: { type: '1' }, order: [['createdAt', 'DESC']]
            });
        });
    }
    getOthers(req) {
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
                ], where: { type: '0' }, order: [['createdAt', 'DESC']]
            });
        });
    }
    shareBlog(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body } = req;
            return blogs_entity_1.BlogModel.create({ html: body.html, userId: user.id, writer: user.username, pp: user.imagePath });
        });
    }
    getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return blogs_entity_1.BlogModel.findAll({ attributes: { exclude: ['userId'] } });
        });
    }
    sendComment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body } = req;
            return comments_entity_1.CommentsModel.create({
                comment: body.comment,
                postId: body.postId,
                userId: user.id,
                sender: user.username,
                pp: user.imagePath,
                type: 'comment'
            }).then(() => {
                return posts_entity_1.PostsModel.findByPk(body.postId).then((post) => {
                    const totalComment = post.toJSON().commentCount + 1;
                    return posts_entity_1.PostsModel.update({ commentCount: totalComment }, { where: { id: body.postId } });
                });
            });
        });
    }
    getComments(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return comments_entity_1.CommentsModel.findAll({
                order: [['createdAt', 'DESC']],
                where: { postId: req.body.id },
                include: [
                    {
                        model: comments_likes_entity_1.CommentsLikesModel,
                        required: false,
                        where: {
                            userId: req.user.id,
                        }
                    }
                ]
            });
        });
    }
    sendResponse(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body } = req;
            return responses_entity_1.ResponsesModel.create({
                sender: user.username,
                pp: user.imagePath,
                commentId: body.commentId,
                type: 'response',
                userId: user.id,
                likesCount: 0,
                response: body.response,
                postId: body.postId
            });
        });
    }
    getResponses(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return responses_entity_1.ResponsesModel.findAll({
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: user_entity_1.UserModel,
                        as: 'sender'
                    }
                ],
                where: { commentId: req.body.commentId }
            });
        });
    }
    deleteComment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params, user, body } = req;
            yield comments_likes_entity_1.CommentsLikesModel.destroy({
                where: {
                    postId: body.postId,
                    sender: user.username,
                    userId: user.id,
                    commentId: params.id
                }
            });
            return comments_entity_1.CommentsModel.destroy({ where: { id: params.id, userId: user.id } }).then(() => {
                return posts_entity_1.PostsModel.findByPk(body.postId).then((post) => {
                    const totalComment = post.toJSON().commentCount - 1;
                    return posts_entity_1.PostsModel.update({ commentCount: totalComment }, { where: { id: body.postId } });
                });
            });
        });
    }
    likeComment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body } = req;
            const likes = yield comments_likes_entity_1.CommentsLikesModel.findOne({
                where: {
                    userId: user.id,
                    commentId: body.commentId,
                    postId: body.postId,
                    sender: user.username
                }
            });
            if (likes) {
                return 'alreadyLiked';
            }
            return comments_likes_entity_1.CommentsLikesModel.create({
                userId: user.id,
                commentId: body.commentId,
                postId: body.postId,
                sender: user.username
            }).then(() => {
                return comments_entity_1.CommentsModel.findOne({ where: { id: body.commentId } }).then((comment) => {
                    const commentInfo = comment.toJSON().likesCount + 1;
                    return comments_entity_1.CommentsModel.update({ likesCount: commentInfo }, { where: { id: body.commentId } });
                });
            });
        });
    }
    dislikeComment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, body } = req;
            const likes = yield comments_likes_entity_1.CommentsLikesModel.findOne({
                where: {
                    userId: user.id,
                    commentId: body.commentId,
                    postId: body.postId,
                    sender: user.username
                }
            });
            if (!likes) {
                return 'ok';
            }
            return comments_likes_entity_1.CommentsLikesModel.destroy({
                where: {
                    userId: user.id,
                    commentId: body.commentId,
                    postId: body.postId
                }
            }).then(() => {
                return comments_entity_1.CommentsModel.findOne({ where: { id: body.commentId } }).then((comment) => {
                    const commentInfo = comment.toJSON().likesCount - 1;
                    return comments_entity_1.CommentsModel.update({ likesCount: commentInfo }, { where: { id: body.commentId } });
                });
            });
        });
    }
    getLikes() {
        return __awaiter(this, void 0, void 0, function* () {
            return comments_likes_entity_1.CommentsLikesModel.findAll({ attributes: { exclude: ['userId'] } });
        });
    }
};
