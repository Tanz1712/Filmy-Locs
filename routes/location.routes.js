const router = require("express").Router();
const location = require("../models/location.model");


const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");


router.get("/location/create", (req, res) => {
  res.render("location/new-location");
});

router.post("/location/create", (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next("Please provide all required fields");
  }
  location.create({ name })
    .then(() => {
      res.redirect("/location");
    })
    .catch((err) => {
      console.log(`ERROR creating Location: ${err}`);
      res.redirect("/Location/create");
    });
});

router.get("/location", (req, res, next) => {
  location.find()
    .then((locations) => {
      res.render("locations/locations", { locations: locations });
    })
    .catch((err) => {
      next(err);
    });




    router.post("/location/:id/delete", (req, res, next) => {
      const { id } = req.params;
      location.findByIdAndRemove(id)
        .then(() => {
          res.redirect("/location");
        })
        .catch((err) => {
          return next(err);
        });
    
 });

module.exports = router;