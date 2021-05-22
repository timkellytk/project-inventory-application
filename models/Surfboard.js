const mongoose = require("mongoose");

const SurfboardSchema = mongoose.Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, maxLength: 300 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number },
  number_in_stock: { type: Number },
});

SurfboardSchema.virtual("url").get(function () {
  return "/inventory/surfboards/" + this._id;
});

module.exports = mongoose.model("Surfboard", SurfboardSchema);
