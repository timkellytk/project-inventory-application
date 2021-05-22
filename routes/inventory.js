const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.redirect("/");
});

router.get("/surfboards", function (req, res, next) {
  res.render("category_all", { title: "All Surfboards" });
});

router.get("/categories", function (req, res, next) {
  res.render("surfboard_all", { title: "All Categories" });
});

module.exports = router;
