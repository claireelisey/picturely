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
    },

    new(req, res, next){
        res.render("albums/new");
    },

    create(req, res, next){
        let newAlbum = {
            title: req.body.title,
            albumUrl: req.body.albumUrl
        };
        albumQueries.addAlbum(newAlbum, (err, album) => {
            if(err){
                res.redirect(500, "/albums/new");
            } else {
                res.redirect(303, `/albums/${album.id}`);
            }
        });
    },

    show(req, res, next){
        albumQueries.getAlbum(req.params.id, (err, album) => {
            if(err || album == null){
                res.redirect(404, "/");
            } else {
                res.render("albums/show", {album});
            }
        });
    },

    destroy(req, res, next){
        albumQueries.deleteAlbum(req.params.id, (err, album) => {
            if(err){
                res.redirect(500, `/albums/${album.id}`)
            } else {
                res.redirect(303, "/albums")
            }
        });
    },

    edit(req, res, next){
        albumQueries.getAlbum(req.params.id, (err, album) => {
            if(err || album == null){
                res.redirect(404, "/");
            } else {
                res.render("albums/edit", {album});
            }
        });
    },

    update(req, res, next){
        albumQueries.updateAlbum(req.params.id, req.body, (err, album) => {
            if(err || album == null){
                res.redirect(404, `/albums/${req.params.id}/edit`);
            } else {
                res.redirect(`/albums/${album.id}`);
            }
        });
    }

}