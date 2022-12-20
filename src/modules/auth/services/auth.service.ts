import {UserModel} from "../../../models/user/user.entity";
import bcrypt from 'bcryptjs'
import {PostsModel} from "../../../models/posts/posts.entity";
import {AdminModel} from "../../../models/admin/admin.entity";

export const AuthService = new class {

    public async register(body) {
        return UserModel.create({mail: body.mail, username: body.username, password: body.password})
    }

    public async login(body) {
        await AdminModel.findOrCreate({
            where: {
                sender: 'System',
                content: "You haven't created a post yet. Click to create a post!",
                pp: 'morde.jpg',
            }
        })
        const user = await UserModel.scope('withPassword').findOne({where: {mail: body.mail}})

        if (!user) {
            throw new Error('User not found.')
        }


        const {password} = user.toJSON()

        const comparePassword = await bcrypt.compare(body.password, password)

        if (!comparePassword) {
            throw new Error('User not found.')
        }
        return user;
    }
}
