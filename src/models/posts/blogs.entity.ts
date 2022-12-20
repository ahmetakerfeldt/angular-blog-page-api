import * as Sequelize from 'sequelize'

export class BlogModel extends Sequelize.Model {
}

export const blogsEntity = (sequelize) => {

    BlogModel.init({

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        html: {
            type: Sequelize.TEXT('long')
        },
        writer: {
            type: Sequelize.STRING
        },
        pp: {
            type: Sequelize.STRING
        }

    }, {
        sequelize,
        tableName: 'blogs',
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: ['userId']
            }
        }
    })
}
