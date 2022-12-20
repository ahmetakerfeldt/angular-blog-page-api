import {UserModel} from "../../../models/user/user.entity";
import bcrypt from 'bcryptjs'
import {PostsModel} from "../../../models/posts/posts.entity";
import {CommentsModel} from "../../../models/posts/comments.entity";
import {ResponsesModel} from "../../../models/posts/responses.entity";
import {CommentsLikesModel} from "../../../models/posts/comments-likes.entity";
import {PostsLikesModel} from "../../../models/posts/post-likes.entity";

export const SettingsService = new class {


    public async changeUsername(req) {
        const {user, body} = req
        const lastUsername = user.username
        const userInfo = await UserModel.scope('withPassword').findByPk(user.id)
        const comparePassword = await bcrypt.compare(body.password, userInfo.toJSON().password)

        if (!comparePassword) {
            throw new Error('Password is not correct.')
        }

        const otherUser = await UserModel.findOne({where: {username: body.username}})

        if (otherUser) {
            throw new Error('Username already taken!')
        }
        return userInfo.update({username: body.username, password: body.password}).then(() => {
            return PostsModel.update({sender: body.username}, {where: {userId: user.id}}).then(() => {
                return PostsModel.create({
                    userId: user.id,
                    pp: user.imagePath,
                    type: '0',
                    sender: body.username,
                    content: `${lastUsername}, changed username to ${body.username}`
                }).then(() => {
                    return CommentsModel.update({sender: body.username}, {where: {sender: user.username}}).then(() => {
                        return ResponsesModel.update({sender: body.username}, {where: {sender: user.username}})
                    }).then(()=> {
                        return CommentsLikesModel.update({sender: body.username}, {where: {sender: user.username}})
                    }).then(()=> {
                        return PostsLikesModel.update({sender: body.username}, {where: {sender: user.username}})
                    })
                })
            })
        })
    }

    public async changePassword(req) {
        const {user, body} = req

        const password = await UserModel.scope('withPassword').findByPk(user.id)

        const comparePassword = await bcrypt.compare(body.oldPassword, password.toJSON().password)

        if (!comparePassword) {
            throw new Error('Password is not correct.')
        }

        user.update({password: body.newPassword})


    }

}
