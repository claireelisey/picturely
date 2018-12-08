const express = require("express");
const router = express.Router();

const albumController = require("../controllers/albumController")

router.get("/albums", albumController.index);

module.exports = router;