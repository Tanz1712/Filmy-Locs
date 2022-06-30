const router = require("express").Router();

const Movie = require('../models/Movie.model');

router.get('/movies', (req, res) => {
	//Get movies from DB
	Movie.find()
		.populate('owner')
		.then((movies) => {
			res.render('movies/all-movies', { movies });
		})
		.catch((error) => {
			console.log(error);
		});
});

module.exports = router;