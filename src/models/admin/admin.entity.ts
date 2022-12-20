import * as Sequelize from 'sequelize'

export class AdminModel extends Sequelize.Model {

}


export const adminEntity = (sequelize) => {

    AdminModel.init({

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pp: {
            type: Sequelize.STRING,
            defaultValue: 'morde.jpg'
        },
        sender: {
            type: Sequelize.STRING,
            defaultValue: 'System'
        },
        content: {
            type: Sequelize.STRING,
            defaultValue: "You haven't created a post yet. Click to create a post!"
        },
        contentP: {
            type: Sequelize.STRING,
            defaultValue: 'finn.jpg'
        }

    }, {
        sequelize,
        timestamps: true,
        tableName: 'admin'
    })
}
