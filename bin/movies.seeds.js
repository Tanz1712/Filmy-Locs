const mongoose = require("mongoose");
const Movie = require("../models/Movie.model");
const Location = require("../models/Location.model");

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://ironhacker:tan@tan.sinaeps.mongodb.net/?retryWrites=true&w=majority";


const movies = [
  {
    title: "Skyfall",
    imageUrl:
      "https://res.cloudinary.com/der1ghtaj/image/upload/v1657963143/project-2-images/efjzwwlrxglkqnta7znf.jpg",
    director: "Sam Mendes",
    cast: ["Daniel Craig", "Javier Bardem", "Judi Dench"],
    plot: "When James Bond's (Daniel Craig) latest assignment goes terribly wrong, it leads to a calamitous turn of events: Undercover agents around the world are exposed, and MI6 is attacked, forcing M (Judi Dench) to relocate the agency. ",

    relasedate: 23 / 10 / 2012,
    country: "United Kindom",

  },
  {
    title: "The Fugitive",
    imageUrl:
      "https://res.cloudinary.com/der1ghtaj/image/upload/v1657963376/project-2-images/jtpxy1xa4exfmrehyfhy.jpg",
    director: "Andrew Davis",
    cast: ["Tommy Lee Jones", "Sela Ward", "Harrison Ford"],
    plot: "Dr Richard Kimble is falsely charged with killing his wife. When Deputy Marshal Samuel Gerard pursues him after he escapes from prison, Richard realises that he cannot trust anybody.",
    relasedate: 6 / 8 / 1993,
    country: "united States",
  },
  {
    title: "French Kiss",
    imageUrl:
      "https://res.cloudinary.com/der1ghtaj/image/upload/v1657963269/project-2-images/mdmk3ou0wqxtypsuse9z.jpg",
    director: "Lawrence kasdan",
    cast: ["Meg Ryan", "Kevin Kline", "Jean Reno"],
    plot: "Kate plans to confront her straying fiancé who stays in France. On her way she meets Luc, a thief, who hides a stolen necklace in her bag. Her life changes when she falls in love with Luc.",
    relasedate: 5 / 5 / 1995,
    country: "France",
  },
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    Movie.create(movies)
      .then((allTheMoviesFromDB) => {
        console.log(`Created ${allTheMoviesFromDB.length} movies`);
        // Once created, close the DB connection
        mongoose.connection.close();
      })
      .catch((err) =>
        console.log(
          `An error occurred while creating movies from the DB: ${err}`
        )
      );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });