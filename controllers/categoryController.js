const category = require("../models/Category");

// Display all categories
exports.category_list = function (req, res, next) {
  category.find({}).exec(function (err, category_list) {
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
  console.log("-----category_detail fired");
  category.findById(req.params.id).exec(function (err, the_category) {
    if (err) {
      return next(err);
    }
    res.render("category_details", { category: the_category });
  });
};

// Display create category form on GET
exports.category_create_get = function (req, res, next) {
  res.send("NOT IMPLEMENTED: create category GET");
};

// Handle create category form on POST
exports.category_create_post = function (req, res, next) {
  res.send("NOT IMPLEMENTED: create category POST");
};

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
