const mongoose = require('mongoose');
const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  id: Number,
  question_id: Number,
  body: String,
  date_written: {type: Date, default: Date.now},
  answerer_name: String,
  answerer_email: String,
  reported: {type: Boolean, default: false},
  helpful: {type: Number, default: 0}
})

module.exports = mongoose.model('Answer', schema);