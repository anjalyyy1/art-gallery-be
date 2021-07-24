// this file will be the entry point for all the configurations
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = require("./app");

// for other types of error
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true, // to deal with deprecation warnings
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Error connecting database");
  });
const server = app.listen(process.env.PORT || 4000);

// for all the unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
