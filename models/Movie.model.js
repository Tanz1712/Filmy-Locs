const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: String,
    Director: String,
    cast: [String],
    image: String,
    loctions: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    country: String,
   
  });

const Movie = model("Movie", movieSchema)

module.exports = Movie;