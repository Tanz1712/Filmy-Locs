const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  name: String,
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

const Location = model("Location", locationSchema);

module.exports = Location;
