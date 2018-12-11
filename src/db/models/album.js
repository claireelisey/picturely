'use strict';

module.exports = (sequelize, DataTypes) => {

    var Album = sequelize.define('Album', {
        title: {
            allowNull: false,
            type: Sequelize.STRING
        },
        albumUrl: {
            allowNull: false,
            type: Sequelize.STRING
        }
    }, {});
    
    Album.associate = function(models) {
        // associations can be defined here
    };

    return Album;
};