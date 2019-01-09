const express = require("express");

const router = express.Router();

const Trivia = require("../models/trivia");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid){
      error = null
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '-' + ext);
  }
});

router.get("", (req, res, next) => {
  Trivia.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: "Post added succesfully",
      trivias: documents
    });
  });
});

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol +  '://' + req.get("host");
  const trivia = new Trivia({
    title: req.body.title,
    question: req.body.question,
    category: req.body.category,
    choices: JSON.parse(req.body.choices),
    correct_answer: req.body.correct_answer,
    triviaProp: req.body.triviaProp,
    imagePath: url + '/images/' + req.file.filename

  });
  trivia.save().then(createdTrivia => {
    // createdPost = post that was created from post
    console.log(createdTrivia);
    res.status(201).json({
      message: "Trivia added sucsflysadasd",
      trivia: {
        id: createdTrivia._id,
        title: createdTrivia.title,
        question: createdTrivia.question,
        category: createdTrivia.category,
        choices: createdTrivia.choices,
        correct_answer: createdTrivia.correct_answer,
        triviaProp: createdTrivia.triviaProp,
        imagePath: url + '/images/' + req.file.filename
      }
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
