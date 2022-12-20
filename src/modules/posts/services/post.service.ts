import {PostsModel} from "../../../models/posts/posts.entity";
import {BlogModel} from "../../../models/posts/blogs.entity";
import {CommentsModel} from "../../../models/posts/comments.entity";
import {ResponsesModel} from "../../../models/posts/responses.entity";
import {CommentsLikesModel} from "../../../models/posts/comments-likes.entity";
import {UserModel} from "../../../models/user/user.entity";
import {PostsLikesModel} from "../../../models/posts/post-likes.entity";

export const PostService = new class {

    public async getVideos(req) {
        const {user} = req
        return PostsModel.findAll({
            include: [
                {
                    model: PostsLikesModel,
                    required: false,
                    where: {
                        userId: user.id,
                    }
                }
            ], where: {type: '2'}, order: [['createdAt', 'DESC']]
        })
    }

    public async getPhotos(req) {
        const {user} = req
        return PostsModel.findAll({
            include: [
                {
                    model: PostsLikesModel,
                    required: false,
                    where: {
                        userId: user.id,
                    }
                }
            ], where: {type: '1'}, order: [['createdAt', 'DESC']]
        })
    }

    public async getOthers(req) {
        const {user} = req
        return PostsModel.findAll({
            include: [
                {
                    model: PostsLikesModel,
                    required: false,
                    where: {
                        userId: user.id,
                    }
                }
            ], where: {type: '0'}, order: [['createdAt', 'DESC']]
        })
    }

    public async shareBlog(req) {
        const {user, body} = req
        return BlogModel.create({html: body.html, userId: user.id, writer: user.username, pp: user.imagePath})
    }

    public async getBlogs() {
        return BlogModel.findAll({attributes: {exclude: ['userId']}})
    }

    public async sendComment(req) {
        const {user, body} = req
        return CommentsModel.create({
            comment: body.comment,
            postId: body.postId,
            userId: user.id,
            sender: user.username,
            pp: user.imagePath,
            type: 'comment'
        }).then(() => {
            return PostsModel.findByPk(body.postId).then((post) => {
                const totalComment = post.toJSON().commentCount + 1
                return PostsModel.update({commentCount: totalComment}, {where: {id: body.postId}})
            })
        })
    }

    public async getComments(req) {
        return CommentsModel.findAll({
            order: [['createdAt', 'DESC']],
            where: {postId: req.body.id},
            include: [
                {
                    model: CommentsLikesModel,
                    required: false,
                    where: {
                        userId: req.user.id,
                    }
                }
            ]
        })
    }

    public async sendResponse(req) {
        const {user, body} = req
        return ResponsesModel.create({
            sender: user.username,
            pp: user.imagePath,
            commentId: body.commentId,
            type: 'response',
            userId: user.id,
            likesCount: 0,
            response: body.response,
            postId: body.postId
        })
    }

    public async getResponses(req) {
        return ResponsesModel.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: UserModel,
                    as: 'sender'
                }
            ],
            where: {commentId: req.body.commentId}
        })
    }

    public async deleteComment(req) {
        const {params, user, body} = req
        await CommentsLikesModel.destroy({
            where: {
                postId: body.postId,
                sender: user.username,
                userId: user.id,
                commentId: params.id
            }
        })
        return CommentsModel.destroy({where: {id: params.id, userId: user.id}}).then(() => {
            return PostsModel.findByPk(body.postId).then((post) => {
                const totalComment = post.toJSON().commentCount - 1
                return PostsModel.update({commentCount: totalComment}, {where: {id: body.postId}})
            })
        })

    }

    public async likeComment(req) {
        const {user, body} = req
        const likes = await CommentsLikesModel.findOne({
            where: {
                userId: user.id,
                commentId: body.commentId,
                postId: body.postId,
                sender: user.username
            }
        })

        if (likes) {
            return 'alreadyLiked'
        }


        return CommentsLikesModel.create({
            userId: user.id,
            commentId: body.commentId,
            postId: body.postId,
            sender: user.username
        }).then(() => {
            return CommentsModel.findOne({where: {id: body.commentId}}).then((comment) => {
                const commentInfo = comment.toJSON().likesCount + 1
                return CommentsModel.update({likesCount: commentInfo}, {where: {id: body.commentId}})
            })
        })
    }

    public async dislikeComment(req) {
        const {user, body} = req
        const likes = await CommentsLikesModel.findOne({
            where: {
                userId: user.id,
                commentId: body.commentId,
                postId: body.postId,
                sender: user.username
            }
        })
        if (!likes) {
            return 'ok';
        }
        return CommentsLikesModel.destroy({
            where: {
                userId: user.id,
                commentId: body.commentId,
                postId: body.postId
            }
        }).then(() => {
            return CommentsModel.findOne({where: {id: body.commentId}}).then((comment) => {
                const commentInfo = comment.toJSON().likesCount - 1
                return CommentsModel.update({likesCount: commentInfo}, {where: {id: body.commentId}})
            })
        })
    }

    async getLikes() {
        return CommentsLikesModel.findAll({attributes: {exclude: ['userId']}})
    }


}
