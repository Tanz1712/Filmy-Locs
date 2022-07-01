const { Router } = require("express");
const router = new Router();

const mongoose = require("mongoose");

const Movie = require("../models/Movie.model");

// import library that allows us to upload files
const fileUploader = require("../config/cloudinary.config");

// require auth middleware
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

// GET route to display the form
router.get("/userProfile/movies/create", isLoggedIn, (req, res) => {
  res.render("movies/new-movie", { userInSession: req.session.currentUser });
});

// POST route to save a new movie to the database in the movies collection
router.post(
  "/userProfile/movies/create",
  fileUploader.single("project-2-images"),
  (req, res, next) => {
    // 'owner' represents the ID of the user document
    console.log(req.body);

    //Get the form data from the body
    const { name, description, imageUrl, owner } = req.body;

    Movie.create({
      name,
      description,
      imageUrl: req.file.path,
      owner,
    })
      // when the new movie is created, the user needs to be found and its owner updated with the
      // ID of newly created movie
      // return Movie.findByIdAndUpdate(owner, { $push: { owner: createdMovieFromDB._id }})
      .then((createdMovieFromDB) =>
        console.log(`New movie created: ${createdMovieFromDB.name}.`)
      )
      .then(() => res.redirect("/userProfile/movies")) // if everything is fine, redirect to list of movies
      .catch((error) => next(error));
  }
);

// GET route to display the form to update a specific movie
router.get('/userProfile/movies/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params;
 
  Movie.findById(movieId)
    .then(movieToEdit => {
      console.log(movieToEdit);
      res.render('movies/movie-edit.hbs', { movie: movieToEdit });
    })
    .catch(error => next(error));
});

// POST route to actually make updates on a specific movie
router.post("/userProfile/movies/:movieId/edit", fileUploader.single('project-2-images'), (req, res, next) => {
  const { movieId } = req.params;
  const { name, description, existingImage  } = req.body;

  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = existingImage;
  }

  Movie.findByIdAndUpdate(movieId, { name, description, imageUrl }, { new: true })
    .then((updatedMovie) => res.redirect(`/userProfile/movies/${updatedMovie.id}`)) // go to the details page to see the updates
    .catch((error) => next(error));
});

// POST route to delete a movie from the database
router.post('/userProfile/movies/:movieId/delete', (req, res, next) => {
  const { movieId } = req.params;
 
  Movie.findByIdAndDelete(movieId)
    .then(() => res.redirect('/userProfile/movies'))
    .catch(error => next(error));
});

// GET route to retrieve and display all the movies
router.get('/userProfile/movies', (req, res, next) => {
	//Get movies from DB
	Movie.find()
		.then((allTheMoviesFromDB) => {
			console.log('retrieved movies from DB: ', allTheMoviesFromDB);

			// we call the render method after we obtain the movies data from the database -> allTheMoviesFromDB
			res.render('movies/all-movies', { movies: allTheMoviesFromDB });
		})
		.catch((error) => {
			console.log(error);

			// Call the error-middleware to display the error page to the user
			next(error);
		});
});

// GET route to retrieve and display details of a specific movie 
router.get('/userProfile/movies/:movieId', (req, res, next) => {
	const { movieId } = req.params;

	console.log('The ID from the URL is: ', movieId);
   
	Movie.findById(movieId)
    .then(theMovie => res.render('movies/movie-details.hbs', { movie: theMovie }))
    .catch(error => {
      console.log('Error while retrieving movie details: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
  });

module.exports = router;
