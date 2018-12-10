'use strict';

module.exports = (sequelize, DataTypes) => {

    var Album = sequelize.define('Album', {
        title: DataTypes.STRING,
        albumUrl: DataTypes.STRING
    }, {});
    
    Album.associate = function(models) {
        // associations can be defined here
    };

    return Album;
};