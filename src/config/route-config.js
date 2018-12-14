module.exports = {

    init(app){
        const staticRoutes = require("../routes/static");
        const albumRoutes = require("../routes/albums");
        const postRoutes = require("../routes/posts");

        app.use(staticRoutes);
        app.use(albumRoutes);
        app.use(postRoutes);
    }
    
}