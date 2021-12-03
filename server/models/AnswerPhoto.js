const mongoose = require('mongoose');
const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  id: Number,
  answer_id: Number,
  url: String
})

module.exports =  mongoose.model('AnswerPhoto', schema);