const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required."],
    },
    imageUrl: {
      type: String,
      required: [true, "imageUrl is required."],
    },
    director: String,
    cast: [String],
    plot: String,
    releaseDate: {
      type: Date,
    },
    country: String,
    locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
  },
  {
    timestamps: true,
  }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
