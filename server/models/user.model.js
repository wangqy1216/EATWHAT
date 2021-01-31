const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  type: String,
  cellPhone: {
    type: String,
    trim: true,
  },
  flightNumber: String,
  orderId: String
})

module.exports = mongoose.model('User', UserSchema);