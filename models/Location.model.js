const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  name: [String],
  description: String,
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

const Locations = model("Locations", locationSchema);

module.exports = Locations;
