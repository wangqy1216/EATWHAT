const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import OrderSchema from './order.model';

const FlightSchema = new Schema({
  flightNumber: String,
  // capacity: Number,
  orders: [OrderSchema]
})

module.exports = mongoose.model('Flight', FlightSchema);