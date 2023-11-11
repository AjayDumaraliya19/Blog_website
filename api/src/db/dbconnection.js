const mongoose = require("mongoose");
const config = require("../config/config");

/* ------------------- Create database connection function ------------------ */
const connectDB = async () => {
  mongoose
    .connect(config.mongodb.url)
    .then((data) => {
      console.log("Database connection successfully !");
    })
    .catch((err) => {
      console.log("Database connection error : ", err);
    });
};

module.exports = { connectDB };
