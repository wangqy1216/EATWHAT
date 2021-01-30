const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  type: String,
  description: String,
  seatNumber: String,
  flightNumber: String,
})

module.exports = mongoose.model('Order', OrderSchema);