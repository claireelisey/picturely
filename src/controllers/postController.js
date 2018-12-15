const postQueries = require("../db/queries.posts.js");
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports = {

    new(req, res, next){
        res.render("posts/new", {albumId: req.params.albumId});
    },

    create(req, res, next){
        cloudinary.uploader.upload(req.files.image.path, function(result) {
            let newPost= {
                caption: req.body.caption,
                image: result.url,
                albumId: req.params.albumId
            };
            postQueries.addPost(newPost, (err, post) => {
                console.log(err);
                if(err){
                    res.redirect(500, "/posts/new");
                } else {
                    res.redirect(303, `/albums/${newPost.albumId}/posts/${post.id}`);
                }
            });
        });
    },

    show(req, res, next){
        postQueries.getPost(req.params.id, (err, post) => {
            if(err || post == null){
                res.redirect(404, "/");
            } else {
                res.render("posts/show", {post});
            }
        });
    },

    destroy(req, res, next){
        postQueries.deletePost(req.params.id, (err, deletedRecordsCount) => {
            if(err){
                res.redirect(500, `/albums/${req.params.albumId}/posts/${req.params.id}`)
            } else {
                res.redirect(303, `/albums/${req.params.albumId}`)
            }
        });
    },

    edit(req, res, next){
        postQueries.getPost(req.params.id, (err, post) => {
            if(err || post == null){
                res.redirect(404, "/");
            } else {
                res.render("posts/edit", {post});
            }
        });
    },

    update(req, res, next){
        postQueries.updatePost(req.params.id, req.body, (err, post) => {
            if(err || post == null){
                res.redirect(404, `/albums/${req.params.albumId}/posts/${req.params.id}/edit`);
            } else {
                res.redirect(`/albums/${req.params.albumId}/posts/${req.params.id}`);
            }
        });
    }

}