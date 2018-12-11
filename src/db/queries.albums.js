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
    }

}