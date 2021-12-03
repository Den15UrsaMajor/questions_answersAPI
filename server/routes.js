const express = require('express');
const Question = require('./models/Question.js');
const Answer = require('./models/Answer.js');
const mongo = require('./db.js');
const router = express.Router();


//GET that lists all questions for a given product,
router.get('/qa/:product_id', async(req, res) => {
  const { product_id } = req.query;
  const id = parseInt(product_id);
  const questions = await mongo.getProductQuestions(id);
  res.status(200).send(questions);
})

//GET that list of all answers for a given question
router.get('/qa/:question_id/answers', async(req, res) => {
  const { question_id } = req.query;
  const id = parseInt(question_id);
  const answers = await mongo.getQuestionAnswers(id);
  res.status(200).send(answers);
})
//GET that lists all of the photo data for a given answer
router.get('/qa/:answer_id/answer_photos', async (req, res) => {
  const { answer_id } = req.query;
  const id = parseInt(answer_id);
  const photos = await mongo.findPhotos(id);
  res.status(200).send(photos);
})

//POST adds a question
router.post('/qa/:product_id', async (req, res) => {
  const data = req.body;
  const questions = await mongo.addToQuestions(data);
  res.status(201).send(questions);
})

//marks a question as reported
router.put('/qa/question/:question_id/report', async (req, res, next) => {
  const questionID = req.query;
  Question.updateOne({'_id': questionID}, {$set: {'reported': true}})
    .then((update)=> {
      res.send(update);
    }).catch(next);
})

//increments the helpful count for a question
router.put('/qa/question/:question_id/helpful', async (req, res, next) => {
  const questionID = req.query;
  Question.updateOne({'_id': questionID}, {$inc: {'helpful': 1}})
    .then((update) => {
      res.send(update)
    }).catch(next);
})


router.post('/qa/:question_id/answers', async (req, res) => {
  const data = req.body;
  const { photos } = data;
  const answers = await mongo.addToAnswers(data);
  if (photos) {
    mongo.addToPhotos(photos);
  }
  res.status(201).send(answers);
})

router.put('/qa/answer/:answer_id/report', async (req, res, next) => {
  const answerID = req.query;
  Answer.updateOne({'_id': answerID}, {$set: {'reported': true}})
    .then((update)=> {
      res.send(update);
    }).catch(next);
})
//increments the helpful count for a question
router.put('/qa/answer/:answer_id/helpful', async (req, res, next) => {
  const answerID = req.query;
  Answer.updateOne({'_id': answerID}, {$inc: {'helpful': 1}})
    .then((update) => {
      res.send(update)
    }).catch(next);
})

module.exports = router;

