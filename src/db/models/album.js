'use strict';

module.exports = (sequelize, DataTypes) => {

    var Album = sequelize.define('Album', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {});
    
    Album.associate = function(models) {

        Album.hasMany(models.Post, {
            foreignKey: "albumId",
            as: "posts"
        });

    };

    return Album;
    
};