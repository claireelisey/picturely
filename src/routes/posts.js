const express = require("express");
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const postController = require("../controllers/postController");
const validation = require("./validation");

router.get("/albums/:albumId/posts/new", postController.new);
router.post("/albums/:albumId/posts/create", multipartMiddleware, validation.validatePosts, postController.create);
router.get("/albums/:albumId/posts/:id", postController.show);
router.post("/albums/:albumId/posts/:id/destroy", postController.destroy);
router.get("/albums/:albumId/posts/:id/edit", postController.edit);
router.post("/albums/:albumId/posts/:id/update", multipartMiddleware, validation.validatePosts, postController.update);

module.exports = router;