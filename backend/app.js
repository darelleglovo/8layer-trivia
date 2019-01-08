const express = require("express");
const bodyParser = require("body-parser");
// yNJpYwOr96v3sn4C

const app = express();
const mongoose = require("mongoose");

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

const Trivia = require("./models/trivia");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post("/api/trivias", (req, res, next) => {
  const trivia = new Trivia({
    title: req.body.title,
    question: req.body.question,
    category: req.body.category,
    choices: req.body.choices,
    correct_answer: req.body.correct_answer,
    triviaProp: req.body.triviaProp
  });
  // trivia.save();
  // console.log(trivia);
  // res.status(201).json({
  //   message: "Trivia added successfully"
  // });

  trivia.save().then(createdTrivia => { // createdPost = post that was created from post
    console.log(createdTrivia);
    res.status(201).json({
      message: "Trivia added sucsflysadasd",
      triviaId: createdTrivia._id
    });
  });
});

app.get("/api/trivias", (req, res, next) => {
  Trivia.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: "Post added succesfully",
      trivias: documents
    });
  });
});

app.delete("/api/trivias/:id", (req, res, next) => {
  //console.log(req.params.id);
  Trivia.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message: "Trivia deleted.."});
  });
});

// app.use('/api/trivias', (req, res, next) => {
//     const trivias = [
//         {
//             id: '123123',
//             title: 'Title',
//             question: 'Who is the founder of Coca-Cola?',
//             category: 'Category 1',
//             choices: [
//                 'Bill Gates',
//                 'John Stith Pemberton',
//                 'John Cena',
//                 'George Washington'
//             ],
//             correct_answer: 'John Stith Pemberton',
//             trivia: 'The Coca-Cola Company is an American corporation, and manufacturer, retailer, and marketer of nonalcoholic beverage concentrates and syrups. The company is best known for its flagship product Coca-Cola, invented in 1886 by pharmacist John Stith Pemberton in Atlanta, Georgia.'
//         },
//         {
//             id: '432423423',
//             title: 'Title2',
//             question: 'On what year was Coca-Cola founded?',
//             category: 'Category 1',
//             choices: [
//                 '1940',
//                 '1997',
//                 '1886',
//                 '1892'
//             ],
//             correct_answer: '1886',
//             trivia: 'The Coca-Cola Company is an American corporation, and manufacturer, retailer, and marketer of nonalcoholic beverage concentrates and syrups. The company is best known for its flagship product Coca-Cola, invented in 1886 by pharmacist John Stith Pemberton in Atlanta, Georgia.'
//         },
//     ];
//     res.status(200).json({
//         message: 'Posts fetched succesfully!',
//         trivias: trivias,
//     });
// });

module.exports = app;
