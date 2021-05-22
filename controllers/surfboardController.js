const Surfboard = require("../models/Surfboard");

// Display list of all surfboards
exports.surfboard_list = function (req, res, next) {
  Surfboard.find().exec(function (err, surfboard_list) {
    if (err) {
      return next(err);
    }

    if (surfboard_list == null) {
      const error = new Error("Surfboards not found");
      err.status = 404;
      return next(error);
    }

    res.render("surfboard_list", { surfboard_list: surfboard_list });
    return;
  });
};

// Display details page for surfboards
exports.surfboard_details = function (req, res, next) {
  res.send("NOT IMPLEMENTED: display surfboard details");
};

// Display create surfboard form on GET
exports.surfboard_create_get = function (req, res, next) {
  res.send("NOT IMPLEMENTED: create surfboard GET");
};

// Handle create surfboard form on POST
exports.surfboard_create_post = function (req, res, next) {
  res.send("NOT IMPLEMENTED: create surfboard POST");
};

// Display surfboard update form on GET
exports.surfboard_update_get = function (req, res, next) {
  res.send("NOT IMPLEMENTED: update surfboard GET");
};

// Handle surfboard update form on POST
exports.surfboard_update_post = function (req, res, next) {
  res.send("NOT IMPLEMENTED: create surfboard POST");
};

// Display surfboard delete form on GET
exports.surfboard_delete_get = function (req, res, next) {
  res.send("NOT IMPLEMENTED: delete surfboard GET");
};

// Handle surfboard delete form on POST
exports.surfboard_delete_post = function (req, res, next) {
  res.send("NOT IMPLEMENTED: delete surfboard POST");
};
