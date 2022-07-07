const router = require("express").Router();

const mongoose = require("mongoose");

const Movie = require("../models/Movie.model");
const Location = require("../models/Location.model");

// require auth middleware
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

// GET route to display the form to create new Location
router.get("/userProfile/locations/create", isLoggedIn, async (req, res) => {
    const mov = await Movie.find();
    console.log(mov);
    res.render("locations/new-location", {
      userInSession: req.session.currentUser,
      mov: mov,
    });
  });

// POST route to save the new location to the database
router.post("/userProfile/locations/create", isLoggedIn, (req, res, next) => {
      //Get the form data from the body
      const { name, description, movies } = req.body;
  
      console.log(req.body);
  
      Location.create({ name, description, movies })
        .then((createdLocationFromDB) => {
          console.log(`New location created: ${createdLocationFromDB}.`);
        })
        .then(() => res.redirect("/userProfile/locations")) // if everything is fine, redirect to list of locations
        .catch((error) => next(error));
    }
  );

  // GET route to display the form to update a specific location
router.get(
  "/userProfile/locations/:locationId/edit",
  isLoggedIn,
  (req, res, next) => {
    const { locationId } = req.params;

    Location.findById(locationId)

      .then((locationToEdit) => {
        console.log(locationToEdit);
        res.render("locations/location-edit.hbs", { location: locationToEdit });
      })
      .catch((error) => next(error));
  }
);

// POST route to actually make updates on a specific location
router.post(
  "/userProfile/locations/:locationId/edit",
  isLoggedIn,
  (req, res, next) => {
    const { locationId } = req.params;
    const {
      name,
      description,
      movies
    } = req.body;

    Location.findByIdAndUpdate(
      locationId,
      {
        name,
        description,
        movies
      },
      { new: true }
    )

      .then((updatedLocation) =>
        res.redirect(`/userProfile/locations/${updatedLocation.id}`)
      ) // go to the details page to see the updates
      .catch((error) => next(error));
  }
);

  // GET route to retrieve and display all locations
router.get("/userProfile/locations", isLoggedIn, (req, res, next) => {
  //Get locations from DB
  Location.find()
    .then((allTheLocationsFromDB) => {
      console.log("retrieved locations from DB: ", allTheLocationsFromDB);

      // we call the render method after we obtain the locations data from the database -> allTheLocationsFromDB
      res.render("locations/all-locations", { locations: allTheLocationsFromDB });
    })
    .catch((error) => {
      console.log(error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

// GET route to retrieve and display details of a specific location
router.get("/userProfile/locations/:locationId", isLoggedIn, (req, res, next) => {
  const { locationId } = req.params;

  console.log("The ID from the URL is: ", locationId);

  Location.findById(locationId)
    .then((theLocation) =>
      res.render("locations/location-details.hbs", { location: theLocation })
    )
    .catch((error) => {
      console.log("Error while retrieving location details: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});


module.exports = router;