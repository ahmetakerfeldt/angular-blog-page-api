import {Sequelize} from "sequelize";
import {userEntity, UserModel} from "../../models/user/user.entity";
import {postsEntity, PostsModel} from "../../models/posts/posts.entity";
import {BlogModel, blogsEntity} from "../../models/posts/blogs.entity";
import {adminEntity} from "../../models/admin/admin.entity";
import {commentsEntity, CommentsModel} from "../../models/posts/comments.entity";
import {responsesEntity, ResponsesModel} from "../../models/posts/responses.entity";
import {commentsLikesEntity, CommentsLikesModel} from "../../models/posts/comments-likes.entity";
import {postsLikesEntity, PostsLikesModel} from "../../models/posts/post-likes.entity";

export const DataBaseService = new class {

    storage = './database/db.sqlite3'
    private sequelize: Sequelize
    private readonly entities = [userEntity,
        postsEntity,
        blogsEntity,
        adminEntity,
        commentsEntity,
        responsesEntity,
        commentsLikesEntity,
        postsLikesEntity]

    init() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: this.storage
        })

        this.entities.forEach((entity) => {
            entity(this.sequelize)
        })
    }

    associations() {
        UserModel.hasMany(PostsModel, {foreignKey: 'userId'})
        PostsModel.belongsTo(UserModel, {foreignKey: 'userId'})

        UserModel.hasMany(BlogModel, {foreignKey: 'userId'})
        BlogModel.belongsTo(UserModel, {foreignKey: 'userId'})

        PostsModel.hasMany(CommentsModel, {foreignKey: 'postId'})
        CommentsModel.belongsTo(PostsModel, {foreignKey: 'postId'})

        CommentsModel.hasMany(ResponsesModel, {foreignKey: 'postId'})
        ResponsesModel.belongsTo(CommentsModel, {foreignKey: 'postId'})

        CommentsModel.hasMany(CommentsLikesModel, {foreignKey: 'commentId'})
        CommentsLikesModel.belongsTo(CommentsModel, {foreignKey: 'commentId'})

        UserModel.hasMany(CommentsLikesModel, {foreignKey: 'userId'})
        CommentsLikesModel.belongsTo(UserModel, {foreignKey: 'userId'})

        PostsModel.hasMany(CommentsLikesModel, {foreignKey: 'postId'})
        CommentsLikesModel.belongsTo(PostsModel, {foreignKey: 'postId'})

        UserModel.hasMany(ResponsesModel, {foreignKey: 'userId'});
        ResponsesModel.belongsTo(UserModel, {foreignKey: 'userId', as: 'sender'});

        PostsModel.hasMany(PostsLikesModel, {foreignKey: 'postId'})
        PostsLikesModel.belongsTo(PostsModel, {foreignKey: 'postId'})

        UserModel.hasMany(PostsLikesModel, {foreignKey: 'userId'});
        PostsLikesModel.belongsTo(UserModel, {foreignKey: 'userId', as: 'sende'});
    }

    async sync() {
        return this.sequelize.sync({force: true, alter: true})
    }

    async authenticate() {
        return this.sequelize.authenticate().then(() => {
            console.log('Connection successful with database.')
        }).catch(() => {
            console.log('Connection unsuccessful with database.')
        })
    }
}
