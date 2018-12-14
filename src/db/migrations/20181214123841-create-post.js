'use strict';

module.exports = {

    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('Posts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        caption: {
            allowNull: false,
            type: Sequelize.STRING
        },
        image: {
            allowNull: false,
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        albumId: {
            type: Sequelize.INTEGER,
            onDelete: "CASCADE",
            allowNull: false,    
            references: {  
                model: "Albums", 
                key: "id",
                as: "albumId"
            },
        }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Posts');
    }
    
};