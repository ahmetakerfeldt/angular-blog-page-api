import {PostsModel} from "../../../models/posts/posts.entity";
import {PostsLikesModel} from "../../../models/posts/post-likes.entity";
import {CommentsLikesModel} from "../../../models/posts/comments-likes.entity";

export const HomeService = new class {

    public postContent(req) {
        const {user, body} = req
        return PostsModel.create({
            imagePath: body.path,
            content: body.content,
            userId: user.id,
            sender: user.username,
            type: "1",
            title: '',
            pp: user.imagePath
        })
    }

    public postContentForVideo(req) {
        const {user, body} = req

        if (!body) {
            throw new Error('Upload a image!')
        }


        return PostsModel.create({
            videoPath: body.path,
            content: body.content,
            userId: user.id,
            sender: user.username,
            type: "2",
            title: '',
            pp: user.imagePath
        })
    }

    public async allPosts(req) {
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
            ], order: [['createdAt', 'DESC']]
        })
    }

    public async postText(req) {
        const {user, body} = req
        if (body.content == "") {
            throw new Error('Please enter content!')
        }
        return PostsModel.create({
            content: body.content,
            userId: user.id,
            type: "0",
            sender: user.username,
            pp: user.imagePath
        })
    }

    public async getPost(req) {
        const {user, query, body} = req
        return PostsModel.findByPk(body.id, {
            include: [
                {
                    model: PostsLikesModel,
                    required: false,
                    where: {
                        userId: user.id,
                    }
                }
            ]
        })
    }

    public async likePost(req) {
        const {user, body} = req

        const likes = await PostsLikesModel.findOne({
            where: {
                userId: user.id,
                postId: body.postId,
                sender: user.username
            }
        })
        if (likes) {
            return 'ok';
        }

        return PostsLikesModel.create({
            userId: user.id,
            postId: body.postId,
            sender: user.username
        }).then((post)=> {
            return PostsModel.findByPk(body.postId).then((post) => {
                const totalLikes = post.toJSON().likesCount + 1
                return PostsModel.update({likesCount: totalLikes}, {where: {id: body.postId}})
            })
        })
    }

    public async dislikePost(req) {
        const {user, body} = req

        const likes = await PostsLikesModel.findOne({
            where: {
                userId: user.id,
                postId: body.postId,
                sender: user.username
            }
        })
        if (!likes) {
            return 'ok';
        }

        return PostsLikesModel.destroy({
            where: {
                userId: user.id,
                postId: body.postId,
                sender: user.username
            }
        }).then((post)=> {
            return PostsModel.findByPk(body.postId).then((post) => {
                const totalLikes = post.toJSON().likesCount - 1
                return PostsModel.update({likesCount: totalLikes}, {where: {id: body.postId}})
            })
        })
    }

    public async getLikes() {
        return PostsLikesModel.findAll()
    }

}
