module.exports = {

    /* validateAlbums(req, res, next) {

        if(req.method === "POST") {
    
            req.checkBody("title", "must be at least 1 character in length").isLength({min: 1});
            req.checkBody("image", "must be at least 1 character in length").isLength({min: 1});

        }
    
        const errors = req.validationErrors();
    
        if (errors) {
            req.flash("error", errors);
            return res.redirect(303, req.headers.referer)
        } else {
            return next();
        }
    }, */
    
    validatePosts(req, res, next) {

        if(req.method === "POST") {
    
            req.checkParams("albumId", "must be valid").notEmpty().isInt();
            req.checkBody("caption", "must be at least 1 character in length").isLength({min: 1});
            /* req.checkBody("image", "must be at least 1 character in length").isLength({min: 1}); */

        }
    
        const errors = req.validationErrors();
    
        if (errors) {
            req.flash("error", errors);
            return res.redirect(303, req.headers.referer)
        } else {
            return next();
        }
    },

    validateUsers(req, res, next) {
        if(req.method === "POST") {
   
            req.checkBody("email", "must be valid").isEmail();
            req.checkBody("username", "must be at least 4 characters in length").optional().isLength({min: 4})
            req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6})
            req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
        }
   
        const errors = req.validationErrors();
   
        if (errors) {
            req.flash("error", errors);
            return res.redirect(req.headers.referer);
        } else {
            return next();
        }
    }   

}