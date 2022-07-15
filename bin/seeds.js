const mongoose = require('mongoose');
const Movie = require('../models/Movie.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/project-2";

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

 
  const movies = [
    {
      title: 'Skyfall',
      imageUrl:'https://www.amazon.com/James-Skyfall-October-Teaser-Poster/dp/B00CID6LX2',
      director: 'Sam Mendes',
      cast: ['Daniel Craig', 'Javier Bardem', 'Judi Dench'],
      plot:
      "When James Bond's (Daniel Craig) latest assignment goes terribly wrong, it leads to a calamitous turn of events: Undercover agents around the world are exposed, and MI6 is attacked, forcing M (Judi Dench) to relocate the agency. ",
       
      relasedate: 23/10/2012,
      country:'United Kindom',
      },
      {
        title: 'The Fugitive',
        imageUrl:'https://www.mauvais-genres.com/en/us-movie-posters/20458-the-fugitive-original-movie-poster-27x40-in-1993-andrew-davis-harrison-ford-3701092836559.html',
        director: 'Andrew Davis',
        cast: ['Tommy Lee Jones', 'Sela Ward', 'Harrison Ford'],
        plot:
          "Dr Richard Kimble is falsely charged with killing his wife. When Deputy Marshal Samuel Gerard pursues him after he escapes from prison, Richard realises that he cannot trust anybody.",
        relasedate: 6/8/1993,
        country:'united States',
        },
        {
        title: 'French Kiss',
        imageUrl:'url=https://www.amazon.com/French-Kiss-Meg-Ryan/dp/B000035Z1Z/ref=sr_1_1?crid=1XM8Q8K9X9NYT&keywords=french+kiss+%281995+cast%29&qid=1657570674&sprefix=%2Caps%2C2017&sr=8-1',
        director: 'Lawrence kasdan',
        cast: ['Meg Ryan', 'Kevin Kline', 'Jean Reno'],
        plot:'Kate plans to confront her straying fiancé who stays in France. On her way she meets Luc, a thief, who hides a stolen necklace in her bag. Her life changes when she falls in love with Luc.',
        relasedate:5/5/1995,
        country:'France',
       },
    ];

Movie.create(movies)
  .then(moviesFromDB => {
    console.log(`Created ${moviesFromDB.length} movies`);
 
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating movies from the DB: ${err}`));



  const mongoos = require('mongoose');
  const Locations = require('../models/Location.model');
   
  const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/project-2";
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
   
  const locations = [
    {
    name:'United Kindom',
    description: "London has been descriped as a world cultural capital",
    movie: 'Skyfall',
    },
    {
      name:'united State',
      description: 'The USA packs spectacular biodiversity within its borders, boasting some of the most beautiful places in America',
      movie: 'The Fugitive',
        },
        {
           name:'France',
            description: '30 million foreign visitors, and so is one of the most visited cities in the world. Paris sights to see the Eiffel Tower',
            movie: 'French Kiss',
          },
      ];
    Locations.create(location)
  .then(locationsFromDB => {
    console.log(`Created ${locationsFromDB.length} locations`);
 
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating location from the DB: ${err}`));





const mongoos = require('mongoose');
  const User = require('../models/User.model');
   
  const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/project-2";
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


    const user = [
      {
        
      username:'Lucy',
       email:'Lucy@aol.com',
       password:'Greenhouse23',
       
        },

    ];
    User.create(user)
    .then(usersFromDB => {
      console.log(`Created ${usersFromDB.length} users`);
   
      // Once created, close the DB connection
      mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating user from the DB: ${err}`));
