import * as Sequelize from 'sequelize'

export class CommentsModel extends Sequelize.Model {

}

export const commentsEntity = (sequelize) => {

    CommentsModel.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sender: {
            type: Sequelize.STRING
        },
        pp: {
            type: Sequelize.STRING
        },
        comment: {
          type: Sequelize.STRING
        },
        userId: {
          type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        likesCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }

    }, {
        sequelize,
        tableName: 'comments',
        timestamps: true
    })
}
