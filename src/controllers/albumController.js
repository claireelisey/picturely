const albumQueries = require("../db/queries.albums.js");

module.exports = {

    index(req, res, next){
        albumQueries.getAllAlbums((err, albums) => {
            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("albums/index", {albums});
            }
        })
    }

}