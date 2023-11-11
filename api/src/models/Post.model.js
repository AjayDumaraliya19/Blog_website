const mongoose = require("mongoose");

/** Create posts Schema */
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    photo: {
      type: String,
      trim: true,
      required: false,
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = mongoose.model("Post", postSchema);

/** Exports all module here */
module.exports = Post;
