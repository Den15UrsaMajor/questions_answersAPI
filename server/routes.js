const express = require('express');
const Question = require('./models/Question.js');
const Answer = require('./models/Answer.js');
const AnswerPhoto = require('./models/AnswerPhoto.js');
const router = express.Router();


//GET that lists all questions,
router.get('/qa/questions', async(req, res) => {
  const questions = await Question.find({
    product_id: req.query.product_id,
    reported: false
  }).limit(10)
  res.send(questions)
})
//adds a question
router.post('/qa/questions', async (req, res, next) => {
  Question.create(req.body).then((question) => {
    res.send(question);
  }).catch(next);
})
//marks a question as reported
router.put('/qa/questions/report', async (req, res, next) => {
  const questionID = req.query;
  Question.updateOne({'_id': questionID}, {$set: {'reported': true}})
    .then((update)=> {
      res.send(update);
    }).catch(next);
})
//increments the helpful count for a question
router.put('/qa/questions/helpful', async (req, res, next) => {
  const questionID = req.query;
  Question.updateOne({'_id': questionID}, {$inc: {'helpful': 1}})
    .then((update) => {
      res.send(update)
    }).catch(next);
})

//list of all answers
router.get('/qa/answers', async(req, res) => {
  const answers = await Answer.find()
  res.send(answers)
})

router.post('/qa/answers', async (req, res, next) => {
  Answer.create(req.body).then((answer) => {
    res.send(answer);
  }).catch(next);
})

router.put('/qa/answers/report', async (req, res, next) => {
  const answerID = req.query;
  Answer.updateOne({'_id': answerID}, {$set: {'reported': true}})
    .then((update)=> {
      res.send(update);
    }).catch(next);
})
//increments the helpful count for a question
router.put('/qa/answers/helpful', async (req, res, next) => {
  const answerID = req.query;
  Answer.updateOne({'_id': answerID}, {$inc: {'helpful': 1}})
    .then((update) => {
      res.send(update)
    }).catch(next);
})

//list of all answer_photos
router.get('/qa/answer_photos', async (req, res) => {
  const answerPhotos = await AnswerPhoto.find()
  res.send(answerPhotos)
})

router.post('/qa/answer_photos', async (req, res, next) => {
  AnswerPhoto.create(req.body).then((answerPhoto) => {
    res.send(answerPhoto);
  }).catch(next);
})

module.exports = router;

