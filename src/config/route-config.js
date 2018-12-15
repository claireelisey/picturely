module.exports = {

    init(app){

        const staticRoutes = require("../routes/static");
        const albumRoutes = require("../routes/albums");
        const postRoutes = require("../routes/posts");
        const userRoutes = require("../routes/users");

        app.use(staticRoutes);
        app.use(albumRoutes);
        app.use(postRoutes);
        app.use(userRoutes);
        
    }
    
}