module.exports = {

    init(app){
        const staticRoutes = require("../routes/static");
        const albumRoutes = require("../routes/albums");

        app.use(staticRoutes);
        app.use(albumRoutes);
    }
    
}