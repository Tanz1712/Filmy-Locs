const mongoose = require("mongoose");
const Movie = require("../models/Movie.model");
const Location = require("../models/Location.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://ironhacker:tan@tan.sinaeps.mongodb.net/?retryWrites=true&w=majority";

const locations = [
  {
    name: ["United Kindom", "Manchester"],
    description: "London has been descriped as a world cultural capital",
  },
  {
    name: ["united States"], 
    description:
      "The USA packs spectacular biodiversity within its borders, boasting some of the most beautiful places in America",
  },
  {
    name: ["France", "Paris"],
    description:
      "30 million foreign visitors, and so is one of the most visited cities in the world. Paris sights to see the Eiffel Tower",
  },
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    Location.create(locations)
  .then((locationsFromDB) => {
    console.log(`Created ${locationsFromDB.length} locations`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating location from the DB: ${err}`)
  );

  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

