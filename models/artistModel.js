const mongoose = require("mongoose");

// schema
const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: [true, "An art should have an image"],
    },
  },
  {
    timestamps: true,
  }
);

// model
const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
