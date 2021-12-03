const mongoose = require('mongoose');
const Answer = require('./models/Answer.js');
const AnswerPhoto = require('./models/AnswerPhoto.js');
const Question = require('./models/Question.js');
const db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection err'));
db.once('open', () => {
  console.log('connected real good');
});

const getQuestionAnswers = (id) => Answer.aggregate([
  { '$match': { 'quesion_id': id, 'reported': false }},
  {
    '$lookup':{
      'from': 'answerphotos',
      'localField': 'id',
      'foreignField': 'answer_id',
      'as': 'photos'
    }
  },
  { '$sort': { 'helpful': -1 }}
]);

const getProductQuestions = (id) => Question.aggregate([
  { '$match': { 'product_id': id, 'reported': false }},
  { '$sort': { 'helpful': -1 }}
]);

const findPhotos = (id) => AnswerPhoto.find({ 'answer_id': id });

const addToQuestions = async (data) => {
  const priorID = await Question.find({}).sort({ 'id': -1}).limit(1);
  const { id } = priorID[0];
  const date = Date.now();
  const doc = new Question();
  doc._id = mongoose.Types.ObjectId();
  doc.id = id + 1;
  doc.product_id = data.product_id;
  doc.body = data.body;
  doc.date_written = date;
  doc.asker_name = data.asker_name;
  doc.asker_email = data.asker_email;
  doc.reported = data.reported;
  doc.helpful = data.helpful;
  doc.save();
};


const addToPhotos = async (photos) => {
  const priorID = await AnswerPhoto.find({}).sort({ 'id': -1 }).limit(1);
  const { id } = priorID[0];
  for (let i = 0; i < photos.length; i+=1){
    const doc = new AnswerPhoto();
    doc._id = mongoose.Types.ObjectId();
    doc.id = id + 1;
    doc.answer_id = photos.answer_id;
    doc.url = photos[i];
    doc.save();
  }
};

const addToAnswers = async (data) => {
  const priorID = await Answer.find({}).sort({'id': -1}).limit(1);
  const { id } = priorID[0];
  const date = Date.now();
  const doc = new Answer();
  doc._id = mongoose.Types.ObjectId();
  doc.id = id + 1;
  doc.question_id = data.question_id;
  doc.body = data.body;
  doc.date_written = date;
  doc.answerer_name = data.answerer_name;
  doc.answerer_email = data.answerer_email;
  doc.reported = data.reported;
  doc.helpful = data.helpful;
  doc.save();
};


module.exports.getProductQuestions = getProductQuestions;
module.exports.getQuestionAnswers = getQuestionAnswers;
module.exports.findPhotos = findPhotos;
module.exports.addToQuestions = addToQuestions;
module.exports.addToAnswers = addToAnswers;
module.exports.addToPhotos = addToPhotos;

