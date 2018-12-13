const albumQueries = require("../db/queries.albums.js");
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

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
            image: req.body.image
        };
        albumQueries.addAlbum(newAlbum, (err, album) => {
            if(err){
                res.redirect(500, "/albums/new");
            } else {
                res.redirect(303, `/albums/${album.id}`);
            }
        });
    },

    /* create(req, res, next){
        cloudinary.uploader.upload(req.files.image.path, function(result) {
            let newAlbum = {
                title: req.body.title,
                image: req.body.image
            };
            albumQueries.addAlbum(newAlbum, (err, album) => {
                if(err){
                    res.redirect(500, "/albums/new");
                } else {
                    res.redirect(303, `/albums/${album.id}`);
                }
            });
        });
    }, */

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