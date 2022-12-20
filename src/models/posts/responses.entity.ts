import * as Sequelize from 'sequelize'

export class ResponsesModel extends Sequelize.Model {
}

export const responsesEntity = (sequelize) => {

    ResponsesModel.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pp: {
            type: Sequelize.STRING
        },
        likesCount: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        response: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        commentId: {
            type: Sequelize.STRING
        }



    }, {
        sequelize,
        timestamps: true,
        tableName: 'responses'
    })


}
