// libraries
const express = require("express");
const app = express();

// utils
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// body parser
app.use(express.json({}));

// routers
const artistRouter = require("./routes/artistRouter");
const artRouter = require("./routes/artsRouter");

// routes
app.use("/api/v1/artist", artistRouter);
app.use("/api/v1/art", artRouter);

// all other routes
app.all("*", (req, res, next) => {
  // call global handler
  console.log("yes idr se");
  next(new AppError("The requested resource does not exist" + req.url, 404));
});

app.use(globalErrorHandler);

module.exports = app;
