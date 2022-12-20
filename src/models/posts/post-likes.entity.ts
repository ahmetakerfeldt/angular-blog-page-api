import * as Sequelize from 'sequelize'

export class PostsLikesModel extends Sequelize.Model {

}

export const postsLikesEntity = (sequelize) => {

    PostsLikesModel.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sender: {
            type: Sequelize.STRING
        }

    }, {
        sequelize,
        timestamps: true,
        tableName: 'post-likes'
    })






}
