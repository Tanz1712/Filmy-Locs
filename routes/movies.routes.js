const { Router } = require("express");
const router = new Router();

const mongoose = require("mongoose");

const Movie = require("../models/Movie.model");

// import library that allows us to upload files
const fileUploader = require("../config/cloudinary.config");

// require auth middleware
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

router.get("/userProfile/movies/create", isLoggedIn, (req, res) => {
  res.render("movies/new-movie", { userInSession: req.session.currentUser });
});

router.post("/userProfile/movies/create", fileUploader.single('project-2-images'), (req, res) => {

  //Get the form data from the body
  const { name, description, imageUrl, owner } = req.body;

   // 'owner' represents the ID of the user document
  console.log(name, description, imageUrl, owner);
 

  Movie.create({
    name,
    description,
    imageUrl: req.file.path,
    owner
  })
    .then((createdMovieFromDB) => {
        // when the new movie is created, the user needs to be found and its owner updated with the
      // ID of newly created movie
      return Movie.findByIdAndUpdate(owner, { $push: { owner: createdMovieFromDB._id }})
      console.log(createdMovieFromDB);     
    })
    .then(() => res.redirect("/movies")) // if everything is fine, redirect to list of movies
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;