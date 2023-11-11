const { string } = require("joi");
const mongoose = require("mongoose");

/** Create User Schema */
const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

/** Exporte all modules here */
module.exports = User;
