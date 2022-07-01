const mongoose = require('mongoose');
const Movie = require('../models/Movie.model');
 
const MONGO_URI = process.env.MONGODB_URI ||  "mongodb://localhost/project-2";

 
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
 

 
 const Movie = [...]
 
Movie.create(movies)
  .then(moviesFromDB => {
    console.log(`Created ${moviesFromDB.length} movies`);
 
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating movies from the DB: ${err}`));