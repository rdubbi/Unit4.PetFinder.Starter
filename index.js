// import the pets array from data.js
const pets = require("./data");

// init express app
const express = require("express");
const app = express();

const PORT = 8080;

// initiate the path package to serve up index html on the front end
const path = require("path");

// GET - / - returns homepage -- WORKING
// localhost:8080

app.get("/", (req, res) => {
  // serve up the public folder as static index.html file

  // res.sendFile a file with dirname and index.html
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// GET - hello world route -- WORKING
// localhost:8080/api

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// GET - get all pets from the database -- WORKING
// localhost:8080/api/v1/pets

app.get("/api/v1/pets", (req, res) => {
  // send the pets array as a response
  // response a 200 status code and a JSON of pets
  res.status(200).json(pets);
});

// GET - get pet by owner with query string -- WORKING
// localhost:8080/api/v1/pets/owner?owner=John

app.get("/api/v1/pets/owner", (req, res) => {
  // get the owner from the request
  // create a variable the holds the query of owner
  const owner = req.query.owner;
  // find the pet in the pets array

  //   default is .find but .filter is more appropriate because the data shows that owner John owns both Fido
  // and Rover. With .filter we get both when entering query John!
  const pet = pets.filter((pet) => pet.owner === owner);

  // send the pet as a response
  res.json(pet);
});

// GET - get pet by name -- WORKING
// localhost:8080/api/v1/pets/Rover

app.get("/api/v1/pets/:name", (req, res) => {
  // get the name from the request
  // create a variable the holds the query of name
  const name = req.params.name;
  // find the pet in the pets array
  const pet = pets.find((pet) => pet.name === name);

  // send the pet as a response
  res.json(pet);
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

module.exports = app;
