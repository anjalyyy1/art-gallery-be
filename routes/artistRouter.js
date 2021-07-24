const express = require("express");
const router = express.Router();

const {
  getAllArtist,
  createArtist,
} = require("../controllers/artistController");

router.route("/").get(getAllArtist).post(createArtist);

module.exports = router;
