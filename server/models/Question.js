const mongoose = require('mongoose');
const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  id: Number,
  product_id: Number,
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  reported: {type: Boolean, default: false},
  helpful: {type: Number, default: 0}
})

module.exports = mongoose.model('Question', schema);