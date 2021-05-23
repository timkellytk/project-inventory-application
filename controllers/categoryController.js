const Category = require('../models/Category');
const Surfboard = require('../models/Surfboard');
const async = require('async');
const { body, validationResult } = require('express-validator');

const sanitiseCategoryInputs = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You need to enter a name'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You need to enter a description'),
];

// Display all categories
exports.category_list = function (req, res, next) {
  Category.find({}).exec(function (err, category_list) {
    if (err) {
      return next(err);
    }

    res.render('category_list', {
      title: 'All Categories',
      category_list: category_list,
    });
  });
};

// Display category details page
exports.category_detail = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      surfboards: function (callback) {
        Surfboard.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      res.render('category_details', {
        category: results.category,
        surfboards: results.surfboards,
      });
    }
  );
};

// Display create category form on GET
exports.category_create_get = function (req, res, next) {
  res.render('category_form', { title: 'Create Category' });
};

// Handle create category form on POST
exports.category_create_post = [
  // Validate and sanitise fields
  ...sanitiseCategoryInputs,
  function (req, res, next) {
    // If errors, re-render form with error messages
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create Category',
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
  Category.findById(req.params.id).exec(function (err, the_category) {
    if (err) {
      return next(err);
    }

    res.render('category_form', {
      title: 'Update Category',
      category: the_category,
    });
  });
};

// Handle update category form on POST
exports.category_update_post = [
  // Validate and sanitise inputs
  ...sanitiseCategoryInputs,
  function (req, res, next) {
    const errors = validationResult(req);

    // If errors, re-render the form with error messages
    if (!errors.isEmpty()) {
      Category.findById(req.params.id).exec(function (err, the_category) {
        if (err) {
          return next(err);
        }

        res.render('category_form', {
          title: 'Update Category',
          category: the_category,
          errors: errors.array(),
        });
        return;
      });
    }

    // Create updated category
    const updated_category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    // Update category
    Category.findByIdAndUpdate(
      req.params.id,
      updated_category,
      {},
      function (err, the_category) {
        if (err) {
          return next(err);
        }

        // Redirect to new category
        res.redirect(the_category.url);
        return;
      }
    );
  },
];

// Display delete category form on GET
exports.category_delete_get = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      surfboards: function (callback) {
        Surfboard.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      return res.render('category_delete', {
        category: results.category,
        surfboards: results.surfboards,
      });
    }
  );
};

// Handle delete category form on POST
exports.category_delete_post = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      surfboards: function (callback) {
        Surfboard.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      if (results.surfboards.length) {
        return res.render('category_delete', {
          category: results.category,
          surfboards: results.surfboards,
        });
      }

      Category.findByIdAndDelete(req.body.categoryid, {}, function (err) {
        if (err) {
          return next(err);
        }

        return res.redirect('/inventory/categories');
      });
    }
  );
};
