// config/session.config.js

// require session
const session = require("express-session");

// ADDED: require mongostore
const MongoStore = require("connect-mongo");

// since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter
module.exports = (app) => {
  // <== app is just a placeholder here
  // but will become a real "app" in the app.js
  // when this file gets imported/required there

  // required for the app when deployed to Heroku (in production)
  // app.set('trust proxy', 1);

  // use session
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 864000, // 864000 is 1 day
      }, // ADDED code below !!!
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/project-2",
        // ttl => time to live
        // 60 * 1000 ms === 1 min
        // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      }),
    })
  );
};
