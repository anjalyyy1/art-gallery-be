const catchAsync = require("../utils/catchAsync");
const Art = require("../models/artsModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

// get all arts
const getAllArt = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Art.find(), req.query).sort();

  // only filter if status is present
  const filter = {
    ...(!!req.query.status
      ? {
          status: req.query.status,
        }
      : {}),
  };

  const allArts = await features.query
    .select("_id name imageUrl price status ")
    .find(filter);

  res.status(200).json({
    status: "success",
    results: allArts.length,
    data: { arts: allArts },
  });
});

// get single art
const getArt = catchAsync(async (req, res, next) => {
  const art = await Art.findOne({ _id: req.params.id }).select(
    "-__v -createdAt -updatedAt"
  );

  if (!art) {
    return next(new AppError("No art found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      art,
    },
  });
});

// get art
const createArt = catchAsync(async (req, res, next) => {
  const newArt = await Art.create(req.body); // call create on model

  res.status(201).json({
    status: "success",
    data: {
      art: newArt,
    },
  });
});

module.exports = { getAllArt, getArt, createArt };
