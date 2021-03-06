const express = require("express");
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const albumController = require("../controllers/albumController")

router.get("/albums", albumController.index);
router.get("/albums/new", albumController.new);
router.post("/albums/create", multipartMiddleware, albumController.create);
router.get("/albums/:id", albumController.show);
router.post("/albums/:id/destroy", albumController.destroy);
router.get("/albums/:id/edit", albumController.edit);
router.post("/albums/:id/update", albumController.update);

module.exports = router;