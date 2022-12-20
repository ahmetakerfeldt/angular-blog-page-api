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
exports.DataBaseService = void 0;
const sequelize_1 = require("sequelize");
const user_entity_1 = require("../../models/user/user.entity");
const posts_entity_1 = require("../../models/posts/posts.entity");
const blogs_entity_1 = require("../../models/posts/blogs.entity");
const admin_entity_1 = require("../../models/admin/admin.entity");
const comments_entity_1 = require("../../models/posts/comments.entity");
const responses_entity_1 = require("../../models/posts/responses.entity");
const comments_likes_entity_1 = require("../../models/posts/comments-likes.entity");
const post_likes_entity_1 = require("../../models/posts/post-likes.entity");
exports.DataBaseService = new class {
    constructor() {
        this.storage = './database/db.sqlite3';
        this.entities = [user_entity_1.userEntity,
            posts_entity_1.postsEntity,
            blogs_entity_1.blogsEntity,
            admin_entity_1.adminEntity,
            comments_entity_1.commentsEntity,
            responses_entity_1.responsesEntity,
            comments_likes_entity_1.commentsLikesEntity,
            post_likes_entity_1.postsLikesEntity];
    }
    init() {
        this.sequelize = new sequelize_1.Sequelize({
            dialect: 'sqlite',
            storage: this.storage
        });
        this.entities.forEach((entity) => {
            entity(this.sequelize);
        });
    }
    associations() {
        user_entity_1.UserModel.hasMany(posts_entity_1.PostsModel, { foreignKey: 'userId' });
        posts_entity_1.PostsModel.belongsTo(user_entity_1.UserModel, { foreignKey: 'userId' });
        user_entity_1.UserModel.hasMany(blogs_entity_1.BlogModel, { foreignKey: 'userId' });
        blogs_entity_1.BlogModel.belongsTo(user_entity_1.UserModel, { foreignKey: 'userId' });
        posts_entity_1.PostsModel.hasMany(comments_entity_1.CommentsModel, { foreignKey: 'postId' });
        comments_entity_1.CommentsModel.belongsTo(posts_entity_1.PostsModel, { foreignKey: 'postId' });
        comments_entity_1.CommentsModel.hasMany(responses_entity_1.ResponsesModel, { foreignKey: 'postId' });
        responses_entity_1.ResponsesModel.belongsTo(comments_entity_1.CommentsModel, { foreignKey: 'postId' });
        comments_entity_1.CommentsModel.hasMany(comments_likes_entity_1.CommentsLikesModel, { foreignKey: 'commentId' });
        comments_likes_entity_1.CommentsLikesModel.belongsTo(comments_entity_1.CommentsModel, { foreignKey: 'commentId' });
        user_entity_1.UserModel.hasMany(comments_likes_entity_1.CommentsLikesModel, { foreignKey: 'userId' });
        comments_likes_entity_1.CommentsLikesModel.belongsTo(user_entity_1.UserModel, { foreignKey: 'userId' });
        posts_entity_1.PostsModel.hasMany(comments_likes_entity_1.CommentsLikesModel, { foreignKey: 'postId' });
        comments_likes_entity_1.CommentsLikesModel.belongsTo(posts_entity_1.PostsModel, { foreignKey: 'postId' });
        user_entity_1.UserModel.hasMany(responses_entity_1.ResponsesModel, { foreignKey: 'userId' });
        responses_entity_1.ResponsesModel.belongsTo(user_entity_1.UserModel, { foreignKey: 'userId', as: 'sender' });
        posts_entity_1.PostsModel.hasMany(post_likes_entity_1.PostsLikesModel, { foreignKey: 'postId' });
        post_likes_entity_1.PostsLikesModel.belongsTo(posts_entity_1.PostsModel, { foreignKey: 'postId' });
        user_entity_1.UserModel.hasMany(post_likes_entity_1.PostsLikesModel, { foreignKey: 'userId' });
        post_likes_entity_1.PostsLikesModel.belongsTo(user_entity_1.UserModel, { foreignKey: 'userId', as: 'sende' });
    }
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sequelize.sync({ force: false, alter: false });
        });
    }
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sequelize.authenticate().then(() => {
                console.log('Connection successful with database.');
            }).catch(() => {
                console.log('Connection unsuccessful with database.');
            });
        });
    }
};
