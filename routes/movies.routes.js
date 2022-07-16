const { Router } = require("express");
const router = new Router();

const mongoose = require("mongoose");

const Movie = require("../models/Movie.model");
const Location = require("../models/Location.model");

// import library that allows us to upload files
const fileUploader = require("../config/cloudinary.config");

// require auth middleware
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");


// GET route to display the form to create a new Movie
router.get("/userProfile/movies/create", isLoggedIn, async (req, res) => {
  const loc = await Location.find();
  console.log(loc);
  res.render("movies/new-movie", {
    userInSession: req.session.currentUser,
    loc: loc,
  });
});

// POST route to save the new movie to the database
router.post(
  "/userProfile/movies/create",
  isLoggedIn,
  fileUploader.single("project-2-images"),
  (req, res, next) => {
    //Get the form data from the body
    const {
      title,
      imageUrl,
      director,
      cast,
      plot,
      releaseDate,
      country,
      locations,
    } = req.body;

    console.log(req.body);
    Movie.create({
      title,
      imageUrl: req.file.path,
      director,
      cast,
      plot,
      releaseDate,
      country,
      locations,
    })
      .then((createdMovieFromDB) => {
        return Location.findByIdAndUpdate(locations, {
          $push: { movies: createdMovieFromDB._id },
        });

        console.log(`New movie created: ${createdMovieFromDB.title}.`);
      })
      .then(() => res.redirect("/userProfile/movies")) // if everything is fine, redirect to list of movies
      .catch((error) => next(error));
  }
);

// GET route to display the form to update a specific movie
router.get(
  "/userProfile/movies/:movieId/edit",
  isLoggedIn,
  (req, res, next) => {
    const { movieId } = req.params;

    Movie.findById(movieId)
      .populate("locations")

      .then((movieToEdit) => {
        console.log(movieToEdit);
        res.render("movies/movie-edit.hbs", { movie: movieToEdit });
      })
      .catch((error) => next(error));
  }
);

// POST route to actually make updates on a specific movie
router.post(
  "/userProfile/movies/:movieId/edit",
  isLoggedIn,
  fileUploader.single("project-2-images"),
  (req, res, next) => {
    const { movieId } = req.params;
    const {
      title,
      existingImage,
      director,
      cast,
      plot,
      releaseDate,
      country,
      locations,
    } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    Movie.findByIdAndUpdate(
      movieId,
      {
        title,
        imageUrl,
        director,
        cast,
        plot,
        releaseDate,
        country,
        locations,
      },
      { new: true }
    )

      .then((updatedMovie) =>
        res.redirect(`/userProfile/movies/${updatedMovie.id}`)
      ) // go to the details page to see the updates
      .catch((error) => next(error));
  }
);

// POST route to delete a movie from the database
router.post(
  "/userProfile/movies/:movieId/delete",
  isLoggedIn,
  (req, res, next) => {
    const { movieId } = req.params;

    Movie.findByIdAndDelete(movieId)

      .then(() => res.redirect("/userProfile/movies"))
      .catch((error) => next(error));
  }
);

// GET route to retrieve and display all the movies
router.get("/userProfile/movies", (req, res, next) => {
  //Get movies from DB
  Movie.find()

    .then((allTheMoviesFromDB) => {
      console.log("retrieved movies from DB: ", allTheMoviesFromDB);

      // we call the render method after we obtain the movies data from the database -> allTheMoviesFromDB
      res.render("movies/all-movies", { movies: allTheMoviesFromDB });
    })
    .catch((error) => {
      console.log(error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

// GET route to retrieve and display details of a specific movie
router.get("/userProfile/movies/:movieId", isLoggedIn, (req, res, next) => {
  const { movieId } = req.params;

  console.log("The ID from the URL is: ", movieId);

  Movie.findById(movieId)
    .populate("locations")
    .then((theMovie) => {
      console.log(theMovie);
      res.render("movies/movie-details.hbs", { movie: theMovie });
    })
    .catch((error) => {
      console.log("Error while retrieving movie details: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

module.exports = router;
