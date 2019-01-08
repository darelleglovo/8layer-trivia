const express = require("express");

const router = express.Router();

const Trivia = require("../models/trivia");

router.get("", (req, res, next) => {
  Trivia.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: "Post added succesfully",
      trivias: documents
    });
  });
});

router.post("", (req, res, next) => {
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

  trivia.save().then(createdTrivia => {
    // createdPost = post that was created from post
    console.log(createdTrivia);
    res.status(201).json({
      message: "Trivia added sucsflysadasd",
      triviaId: createdTrivia._id
    });
  });
});

router.delete("/:id", (req, res, next) => {
  //console.log(req.params.id);
  Trivia.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Trivia deleted.." });
  });
});

module.exports = router;
