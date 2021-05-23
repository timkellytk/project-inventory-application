const Surfboard = require('../models/Surfboard');
const Category = require('../models/Category');
const async = require('async');
const { body, validationResult } = require('express-validator');

// Display list of all surfboards
exports.surfboard_list = function (req, res, next) {
  Surfboard.find().exec(function (err, surfboard_list) {
    if (err) {
      return next(err);
    }
    if (surfboard_list == null) {
      const error = new Error('Surfboards not found');
      err.status = 404;
      return next(error);
    }

    res.render('surfboard_list', { surfboard_list: surfboard_list });
    return;
  });
};

// Display details page for surfboards
exports.surfboard_details = function (req, res, next) {
  Surfboard.findById(req.params.id)
    .populate('category')
    .exec(function (err, the_surfboard) {
      if (err) {
        return next(err);
      }

      if (the_surfboard == null) {
        const error = new Error('No surfboard');
        error.status = 404;
        return next(error);
      }

      res.render('surfboard_details', { surfboard: the_surfboard });
    });
};

// Display create surfboard form on GET
exports.surfboard_create_get = function (req, res, next) {
  Category.find().exec(function (err, the_categories) {
    if (err) {
      return next(err);
    }
    res.render('surfboard_form', {
      title: 'Add New Surfboard',
      category_list: the_categories,
    });
  });
};

// Handle create surfboard form on POST
exports.surfboard_create_post = [
  // Sanitise and validate fields
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You must enter a name'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You must enter a description'),
  body('category')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You must enter a category'),
  body('price')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You must enter a price')
    .isNumeric()
    .withMessage('The price must be numeric'),
  body('number_in_stock')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You must enter a number in stock')
    .isNumeric()
    .withMessage('The number in stock must be numeric'),
  function (req, res, next) {
    const errors = validationResult(req);

    // If errors, display errors with form
    if (!errors.isEmpty()) {
      Category.find().exec(function (err, the_categories) {
        if (err) {
          return next(err);
        }
        res.render('surfboard_form', {
          title: 'Add New Surfboard',
          category_list: the_categories,
          errors: errors.array(),
        });
      });
    }

    // Save surfboard to db
    const new_surfboard = new Surfboard({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });

    new_surfboard.save(function (err, the_surfboard) {
      if (err) {
        return next(err);
      }

      // Redirect to surfboard
      return res.redirect(the_surfboard.url);
    });
  },
];

// Display surfboard update form on GET
exports.surfboard_update_get = function (req, res, next) {
  async.parallel(
    {
      category_list: function (callback) {
        Category.find().exec(callback);
      },
      surfboard: function (callback) {
        Surfboard.findById(req.params.id, {}, callback);
      },
    },
    function (err, result) {
      if (err) {
        return next(err);
      }

      res.render('surfboard_form', {
        title: 'Update Surfboard',
        category_list: result.category_list,
        surfboard: result.surfboard,
      });
    }
  );
};

// Handle surfboard update form on POST
exports.surfboard_update_post = [
  // Sanitise and validate fields
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You must enter a name'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You must enter a description'),
  body('category')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You must enter a category'),
  body('price')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You must enter a price')
    .isNumeric()
    .withMessage('The price must be numeric'),
  body('number_in_stock')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('You must enter a number in stock')
    .isNumeric()
    .withMessage('The number in stock must be numeric'),
  function (req, res, next) {
    const errors = validationResult(req);

    // If errors, display errors with form
    if (!errors.isEmpty()) {
      Category.find().exec(function (err, the_categories) {
        if (err) {
          return next(err);
        }
        res.render('surfboard_form', {
          title: 'Add New Surfboard',
          category_list: the_categories,
          errors: errors.array(),
        });
      });
    }

    // Save surfboard to db
    const updated_surfboard = new Surfboard({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      _id: req.params.id,
    });

    Surfboard.findByIdAndUpdate(
      req.params.id,
      updated_surfboard,
      {},
      function (err, the_surfboard) {
        if (err) {
          return next(err);
        }

        // Redirect to surfboard
        return res.redirect(the_surfboard.url);
      }
    );
  },
];

// Display surfboard delete form on GET
exports.surfboard_delete_get = function (req, res, next) {
  Surfboard.findById(req.params.id).exec(function (err, the_surfboard) {
    if (err) {
      return next(err);
    }
    res.render('surfboard_delete', { surfboard: the_surfboard });
  });
};

// Handle surfboard delete form on POST
exports.surfboard_delete_post = function (req, res, next) {
  Surfboard.findByIdAndDelete(req.body.surfboardid, {}, function (err) {
    if (err) {
      return next(err);
    }

    return res.redirect('/inventory/surfboards');
  });
};
