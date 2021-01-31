const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = require('./order.model');

const FlightSchema = new Schema({
  flightNumber: String,
  // capacity: Number,
  
  orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
})

module.exports = mongoose.model('Flight', FlightSchema);