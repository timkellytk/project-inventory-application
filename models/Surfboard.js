const mongoose = require("mongoose");

const Schema = mongoose.schema();

const SurfboardSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, maxLength: 300 },
  category: { type: Schema.Types.ObjectId },
  price: { type: Number },
  number_in_stock: { type: Number },
});

SurfboardSchema.virtual("url").get(function () {
  return "/surfboards/" + this._id;
});

module.exports = mongoose.model("Surfboard", SurfboardSchema);
