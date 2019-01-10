const mongoose = require('mongoose');

const triviaSchema = mongoose.Schema({
    title: {type: String, required: true},
    question: {type: String, required: true},
    category: {type: String, required: true},
    choices: [{type: String, required: true}],
    correct_answer: {type: String, required: true},
    triviaProp: {type: String, required: true},
    imagePath: {type: String, required: true},
    blast_day: {type: String, required: true},
    blast_hour: {type: String, required: true},
    blast_from: {type: String, required: true},
    blast_to: {type: String, required: true},
});

module.exports = mongoose.model('Trivia', triviaSchema);