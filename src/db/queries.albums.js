const Album = require("./models").Album;

module.exports = {

    getAllAlbums(callback){
        return Album.all()

        .then((albums) => {
            callback(null, albums);
        })
        .catch((err) => {
            callback(err);
        })
    },

    addAlbum(newAlbum, callback){
        return Album.create({
            title: newAlbum.title,
            albumUrl: newAlbum.albumUrl
        })
        .then((album) => {
            callback(null, album);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getAlbum(id, callback){
        return Album.findById(id)
        .then((album) => {
            callback(null, album);
        })
        .catch((err) => {
            callback(err);
        })
    },

    deleteAlbum(id, callback){
        return Album.destroy({
            where: {id}
        })
        .then((album) => {
            callback(null, album);
        })
        .catch((err) => {
            callback(err);
        })
    },

    updateAlbum(id, updatedAlbum, callback){
        return Album.findById(id)
        .then((album) => {
            if(!album){
                return callback("Album not found");
            }
            album.update(updatedAlbum, {
                fields: Object.keys(updatedAlbum)
            })
            .then(() => {
                callback(null, album);
            })
            .catch((err) => {
                callback(err);
            });
        });
    }

}