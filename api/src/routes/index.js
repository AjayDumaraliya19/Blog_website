const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./users.route");
const postRoute = require("./posts.route");
const cateRoute = require("./categories.route");

/* ------------------------- Create router function ------------------------- */
const router = express.Router();

/* ------------------------------ Create routes ----------------------------- */
router.use("/auths", authRoute);
router.use("/users", userRoute);
router.use("/posts", postRoute);
router.use("/cates", cateRoute);

/* --------------------------- Exports all modules -------------------------- */
module.exports = router;
