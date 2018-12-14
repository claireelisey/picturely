'use strict';

module.exports = (sequelize, DataTypes) => {

    var Post = sequelize.define('Post', {
        caption: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        albumId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});

    Post.associate = function(models) {

        Post.belongsTo(models.Album, {
            foreignKey: "albumId",
            onDelete: "CASCADE"
        });
        
    };

    return Post;

};