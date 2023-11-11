const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");

/** Rrgister user route */
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      user: req.body.user,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

/** Login user route */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ user: req.body.user });
    if (!user) {
      return res.status(400).json("Wrong credentials..!");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Wrong credentials..!");
    }

    const { password, ...other } = user._doc;

    res.status(201).json(other);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

module.exports = router;
