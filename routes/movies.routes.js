const { Router } = require("express");
const router = new Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Movie = require("../models/Movie.model");

// import library that allows us to upload files
const fileUploader = require("../config/cloudinary.config");

// require auth middleware
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

// GET route to display the form to create a new Movie
router.get("/userProfile/movies/create", isLoggedIn, (req, res) => {
  res.render("movies/new-movie", { userInSession: req.session.currentUser });
});

// POST route to save the new movie to the database 
router.post("/userProfile/movies/create", isLoggedIn, fileUploader.single("project-2-images"), (req, res, next) => {
   
    //Get the form data from the body
    const { title, imageUrl, director, cast, plot, releaseDate, country, owner, locations } = req.body;

     // 'owner' represents the ID of the user document
     console.log(req.body);

    Movie.create({
      title, imageUrl: req.file.path, director, cast, plot, releaseDate, country, owner, locations
    })
    .then((createdMovieFromDB) => {
      // when the new movie is created, the user needs to be found and its movies updated with the
      // ID of newly created movie
       return User.findByIdAndUpdate(owner, { $push: { movies: createdMovieFromDB._id }})
        console.log(`New movie created: ${createdMovieFromDB.title}.`);
    })
      .then(() => res.redirect("/userProfile/movies")) // if everything is fine, redirect to list of movies
      .catch((error) => next(error));
  });


// GET route to display the form to update a specific movie
router.get('/userProfile/movies/:movieId/edit', isLoggedIn, (req, res, next) => {
  const { movieId } = req.params;
 
  Movie.findById(movieId)
 // .populate('owner')
    .then(movieToEdit => {
      console.log(movieToEdit);
      res.render('movies/movie-edit.hbs', { movie: movieToEdit });
    })
    .catch(error => next(error));
});

// POST route to actually make updates on a specific movie
router.post("/userProfile/movies/:movieId/edit", isLoggedIn, fileUploader.single('project-2-images'), (req, res, next) => {
  const { movieId } = req.params;
  const { title, existingImage, director, cast, plot, releaseDate, country, owner, locations } = req.body;

  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = existingImage;
  }

  Movie.findByIdAndUpdate(movieId, { title, imageUrl, director, cast, plot, releaseDate, country, owner, locations }, { new: true })
 // .populate('owner')
    .then((updatedMovie) => res.redirect(`/userProfile/movies/${updatedMovie.id}`)) // go to the details page to see the updates
    .catch((error) => next(error));
});

// POST route to delete a movie from the database
router.post('/userProfile/movies/:movieId/delete', isLoggedIn, (req, res, next) => {
  const { movieId } = req.params;
 
  Movie.findByIdAndDelete(movieId)
 // .populate('owner')
    .then(() => res.redirect('/userProfile/movies'))
    .catch(error => next(error));
});

// GET route to retrieve and display all the movies
router.get('/userProfile/movies', isLoggedIn, (req, res, next) => {
	//Get movies from DB
	Movie.find()
  .populate('owner') // --> we are saying: give me whole user object with this ID (owner represents an ID in our case)
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
router.get('/userProfile/movies/:movieId', isLoggedIn, (req, res, next) => {
	const { movieId } = req.params;

	console.log('The ID from the URL is: ', movieId);
   
	Movie.findById(movieId)
  .populate('owner')
 // .populate('owner locations') // <-- the same as .populate('owner').populate('locations')

 /* .populate({
  // we are populating owner in the previously populated locations
  path: "locations",
  populate: {
    path: "owner",
    model: "User"
  }
}) */
    .then(theMovie => res.render('movies/movie-details.hbs', { movie: theMovie }))
    .catch(error => {
      console.log('Error while retrieving movie details: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
  });

module.exports = router;
