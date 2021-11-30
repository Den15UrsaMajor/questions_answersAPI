const mongoose = require('mongoose');
const Answer = require('./models/Answer');
const AnswerPhoto = require('./models/AnswerPhoto');
const Question = require('./models/Question');
const db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection err'));
db.once('open', () => {
  console.log('connected real good');
});

const getProductQuestions = (id) => Question.aggregate([
  {
    '$match': {
      'product_id': id,
      'reported': false
    }
  }, {
    '$sort': {
      'helpful': -1
    }
  }
]);

const getQuestionAnswers = (id) => Answer.aggregate([
  {
    '$match': {
      'question_id': id,
      'reported': false
    }
  }, {
    '$sort': {
      helpful: -1
    }
  }
]);

const getAnswerPhotos = (id) => AnswerPhoto.aggregate([
  {
    '$match': {
      'answer_id': id,
    }
  }, {
    '$lookup': {
      'from': 'answers',
      'localField': 'answer_id',
      'foreignField': '_id',
      'as': 'answer_docs'
    }
  }
]);

module.exports.getProductQuestions = getProductQuestions;
module.exports.getQuestionAnswers = getQuestionAnswers;
module.exports.getAnswerPhotos = getAnswerPhotos;