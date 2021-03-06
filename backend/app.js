const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// yNJpYwOr96v3sn4C mongo key

const app = express();
const mongoose = require("mongoose");

const triviasRoutes = require("./routes/trivias");


mongoose
  .connect(
    "mongodb+srv://dar:yNJpYwOr96v3sn4C@cluster0-it5mh.mongodb.net/trivia-app?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database..");
  })
  .catch(() => {
    console.log("Connection failed..");
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/trivias" ,triviasRoutes);

module.exports = app;
