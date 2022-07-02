 const { Schema, model } = require("mongoose");

const locationSchema = new Schema({ 
city: String,
country:String,

});

const Location = model("Location", locationSchema);

module.exports = Location; 