const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  homepage: {
    type: String,
    required: true,
  },
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;
