const express = require("express");
const router = express.Router();

const {
  createArt,
  getAllArt,
  getArt,
} = require("../controllers/artController.js");

router.route("/").get(getAllArt).post(createArt);
router.route("/:id").get(getArt);

module.exports = router;
