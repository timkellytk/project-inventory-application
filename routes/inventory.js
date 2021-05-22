const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const surfboard_controller = require("../controllers/surfboardController");

// Inventory redirect
router.get("/", function (req, res, next) {
  res.redirect("/");
});

// Surfboards
router.get("/surfboards", surfboard_controller.surfboard_list);
router.get("/surfboards/create", surfboard_controller.surfboard_create_get);
router.post("/surfboards/create", surfboard_controller.surfboard_create_post);

router.get("/surfboards/:id", surfboard_controller.surfboard_details);

router.get("/surfboards/:id/update", surfboard_controller.surfboard_update_get);
router.post(
  "/surfboards/:id/update",
  surfboard_controller.surfboard_update_post
);

router.get("/surfboards/:id/delete", surfboard_controller.surfboard_delete_get);
router.post(
  "/surfboards/:id/delete",
  surfboard_controller.surfboard_delete_post
);

// Categories
router.get("/categories", category_controller.category_list);
router.get("/categories/create", category_controller.category_create_get);
router.post("/categories/create", category_controller.category_create_post);

router.get("/categories/:id", category_controller.category_detail);

router.get("/categories/:id/update", category_controller.category_update_get);
router.post("/categories/:id/update", category_controller.category_update_post);

router.get("/categories/:id/delete", category_controller.category_delete_get);
router.post("/categories/:id/delete", category_controller.category_delete_post);

module.exports = router;
