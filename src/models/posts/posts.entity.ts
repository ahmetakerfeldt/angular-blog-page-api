import * as Sequelize from 'sequelize'


export class PostsModel extends Sequelize.Model {

}

export const postsEntity = (sequelize) => {

    PostsModel.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pp: {
          type: Sequelize.STRING,
        },
        sender: {
            type: Sequelize.STRING
        },
        imagePath: {
            type: Sequelize.STRING
        },
        videoPath: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING,
        },
        title: {
          type: Sequelize.STRING
        },
        commentCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        likesCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'posts',
        modelName: 'PostsModel',
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: ['userId']
            }
        }
    })


}
