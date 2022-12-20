import * as Sequelize from 'sequelize'

export class CommentsLikesModel extends Sequelize.Model {

}

export const commentsLikesEntity = (sequelize) => {

    CommentsLikesModel.init({
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
        tableName: 'comment-likes'
    })






}
