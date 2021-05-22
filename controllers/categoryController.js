const Category = require("../models/Category");
const { body, validationResult } = require("express-validator");

// Display all categories
exports.category_list = function (req, res, next) {
  Category.find({}).exec(function (err, category_list) {
    if (err) {
      return next(err);
    }

    res.render("category_list", {
      title: "All Categories",
      category_list: category_list,
    });
  });
};

// Display category details page
exports.category_detail = function (req, res, next) {
  Category.findById(req.params.id).exec(function (err, the_category) {
    if (err) {
      return next(err);
    }
    res.render("category_details", { category: the_category });
  });
};

// Display create category form on GET
exports.category_create_get = function (req, res, next) {
  res.render("category_form", { title: "Create Category" });
};

// Handle create category form on POST
exports.category_create_post = [
  // Validate and sanitise fields
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("You need to enter a name"),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("You need to enter a description"),
  function (req, res, next) {
    // If errors, re-render form with error messages
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        errors: errors.array(),
      });
    }

    // Create new category and save to db
    const new_category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    new_category.save(function (err) {
      if (err) {
        return next(err);
      }

      // Redirect to new category
      res.redirect(new_category.url);
    });
  },
];

// Display update category form on GET
exports.category_update_get = function (req, res, next) {
  res.send("NOT IMPLEMENTED: category update GET");
};

// Handle update category form on POST
exports.category_update_post = function (req, res, next) {
  res.send("NOT IMPLEMENTED: category update post");
};

// Display delete category form on GET
exports.category_delete_get = function (req, res, next) {
  res.send("NOT IMPLEMENTED: category delete GET");
};

// Handle delete category form on POST
exports.category_delete_post = function (req, res, next) {
  res.send("NOT IMPLEMENTED: category delete post");
};
