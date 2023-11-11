const router = require("express").Router();
const { Category } = require("../models");

/** Create category route */
router.post("/createcates", async (req, res) => {
  const newCat = await Category(req.body);
  try {
    const saveCat = await newCat.save();
    res.status(200).json(saveCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

/** Get category route */
router.get("/getcates", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json(error);
  }
});

/** Exports all module here */
module.exports = router;
