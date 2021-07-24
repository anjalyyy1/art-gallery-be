const mongoose = require("mongoose");

// schema
const artsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "A Art must have a description"],
    },
    imageUrl: {
      type: String,
      required: [true, "An art should have an image."],
    },
    artist: {
      type: mongoose.Schema.ObjectId,
      ref: "Artist",
      required: [true, "An art should have an artist."],
    },
    price: {
      type: Number,
      required: [true, "An art should have a price."],
    },
    status: {
      type: String,
      default: "sale",
      enum: ["sale", "sold"],
    },
  },
  {
    timestamps: true,
  }
);

artsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "artist",
    select: "-_id name imageUrl",
  });
  next();
});

// model
const Art = mongoose.model("Art", artsSchema);
module.exports = Art;
