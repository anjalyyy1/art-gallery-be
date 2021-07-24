const catchAsync = require("../utils/catchAsync");
const Artist = require("../models/artistModel");

// get all artist
const getAllArtist = catchAsync(async (req, res, next) => {
  const allArtist = await Artist.find().select("_id name imageUrl");

  res.status(200).json({
    status: "success",
    results: allArtist.length,
    data: { artists: allArtist },
  });
});

// get artist
const createArtist = catchAsync(async (req, res, next) => {
  const newArtist = await Artist.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      art: newArtist,
    },
  });
});

module.exports = { getAllArtist, createArtist };
