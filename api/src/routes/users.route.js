const router = require("express").Router();
const { User, Post } = require("../models");
const bcrypt = require("bcryptjs");

/** Update user route */
router.put("/update/:id", async (req, res) => {
  if (req.body._id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("You can update only your account..!");
  }
});

/** Delete user route */
router.delete("/delete/:id", async (req, res) => {
  if (req.body._id === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json("User has been deleted..!");
      } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
      }
    } catch (err) {
      res.status(404).json("User not Found..!");
    }
  } else {
    res.status(401).json("You can delete only your account..!");
  }
});

/** Get User by Id */
router.get("/getuser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
