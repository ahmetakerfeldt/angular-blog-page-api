import {PostsModel} from "../../../models/posts/posts.entity";
import {UserModel} from "../../../models/user/user.entity";
import {AdminModel} from "../../../models/admin/admin.entity";
import {CommentsModel} from "../../../models/posts/comments.entity";
import {ResponsesModel} from "../../../models/posts/responses.entity";
import {PostsLikesModel} from "../../../models/posts/post-likes.entity";

export const ProfileService = new class {

    public async userPosts(req) {
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
            ], where: {userId: user.id}, order: [['createdAt', 'DESC']]
        })
    }

    public async deletePost(req) {
        const {body, user} = req
        return PostsModel.destroy({where: {id: body.id, userId: user.id}})
    }

    public async getUserInfo(req) {
        const {user} = req
        return UserModel.findOne({where: {id: user.id}, attributes: {exclude: ['id']}})
    }

    public async getSystem() {
        return AdminModel.findOne({where: {sender: 'System'}})
    }

    public async updateProfile(req) {
        const {user, body} = req
        return UserModel.update(body, {where: {id: user.id}}).then(() => {
            return PostsModel.update({pp: body.imagePath}, {where: {userId: user.id}}).then(() => {
                return PostsModel.create({
                    userId: user.id,
                    content: `${user.username}, changed profile photo`,
                    type: '1',
                    pp: body.imagePath,
                    sender: user.username,
                    imagePath: body.imagePath,
                    title: 'ok'
                }).then(() => {
                    return CommentsModel.update({pp: body.imagePath}, {where: {userId: user.id}}).then(() => {
                        return ResponsesModel.update({pp: body.imagePath}, {where: {userId: user.id}})
                    })
                })
            })
        })
    }

    public async editPost(req) {
        const {user, body, query} = req
        return PostsModel.update({
            imagePath: body.imagePath,
            videoPath: body.videoPath,
            createdAt: body.createdAt,
            content: body.content,
        }, {where: {id: body.id}})
    }
}
