#! /usr/bin/env node

console.log(
  "This script populates some test surfboards and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Surfboard = require("./models/Surfboard");
var Category = require("./models/Category");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var surfboards = [];
var categories = [];

function categoryCreate(name, description, cb) {
  const categoryDetail = { name, description };

  const category = new Category(categoryDetail);

  category.save(function (err) {
    if (err) {
      return cb(err, null);
    }

    console.log("New Category: " + category);
    categories.push(category);
    return cb(null, category);
  });
}

function surfboardCreate(
  name,
  description,
  category,
  price,
  number_in_stock,
  cb
) {
  const surfboardDetail = {
    name,
    description,
    category,
    price,
    number_in_stock,
  };

  const surfboard = new Surfboard(surfboardDetail);

  surfboard.save(function (err) {
    if (err) {
      return cb(err, null);
    }

    console.log("New Surfboard " + surfboard);
    surfboards.push(surfboard);
    cb(null, surfboard);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "Shortboard",
          "Shortboards range from about five to seven feet long, and have an upturned tip (nose rocker)",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Longboards",
          "Longboarding, however, is ultimately a cruisier way of surfing. You're normally on smaller waves, catching more of them, riding for longer lengths of time (than on a shortboard), and you're also able to do different maneuvers on the craft.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Funboards",
          "Choosing a surfboard shape is all about compromise, and the perfect example is the funboard. You can consider the funboard as an “in-between”, half-way between the longboard and the fish.",
          callback
        );
      },
    ],
    cb
  );
}

function createSurfboards(cb) {
  async.series(
    [
      function (callback) {
        surfboardCreate(
          "DARK HORSE - SHORTBOARD - WHITE",
          "The Vessel Dark Horse is a performance shortboard with a wider profile and tailored for smaller days or for surfers who simply want a little more paddle power",
          categories[0],
          359,
          3,
          callback
        );
      },
      function (callback) {
        surfboardCreate(
          "DELTA - BLACK SHORTBOARD",
          "The Vessel Delta is our most impressive shortboard yet.",
          categories[0],
          359,
          1,
          callback
        );
      },
      function (callback) {
        surfboardCreate(
          "'CONTROL FREAK' BY RY CRAIKE",
          "The ISLAND ‘Control Freak’ is an Australian made performance hybrid and perfect allrounder to suit any wave conditions, if you could only take one board on a surf trip the “Control Freak” is the one to pack.",
          categories[0],
          639,
          2,
          callback
        );
      },
      function (callback) {
        surfboardCreate(
          "VINTAGE LOG MAROON",
          "The AQSS Vintage log is the ultimate traditional nose rider.",
          categories[1],
          599,
          2,
          callback
        );
      },
      function (callback) {
        surfboardCreate(
          "BRONZE WHALER BY BEAU YOUNG",
          "The AQSS Bronze Whaler is the awe-inspiring new model by 2x World Champion Beau Young.",
          categories[2],
          899,
          1,
          callback
        );
      },
      function (callback) {
        surfboardCreate(
          "ECO BEAN II FUNBOARD",
          "The Eco Bean delivers unprecedented strength with Vessel’s unique Carbon Infusion Technology.",
          categories[2],
          299,
          5,
          callback
        );
      },
    ],
    cb
  );
}

async.series(
  [createCategories, createSurfboards],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Surfboards: " + surfboards);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
