const express = require('express');
const mongoose = require('mongoose');

const Flight = require('./server/models/flight.model.js');
const Order = require('./server/models/order.model.js');
const User = require('./server/models/user.model.js');

const dbUrl = 'mongodb+srv://new-user:new-user@cluster0.o28kv.mongodb.net/EATWHAT?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


const app = express();

app.get('/', (req, res) => {
  res.send('hello EATWHAT');
});

app.get('/customer/checkin', async (req, res) => {
  const phoneNumber = req.query.cid;
  // console.log(req.query)
  const flightNumber = req.query.fid;
  const user = await User.findOne({ cellPhone: phoneNumber, flightNumber: flightNumber });
  // const flight = await Flight.find({ flightNumber: flightNumber });

  if (user == undefined) {
    res.status(400).json({
      message: 'Error',
      error: 'User not found'
    });
  } else { // Found User
    if (user.orderId) { // Found order record
      const order = await Order.findById(user.orderId)
      if (order === undefined) {
        res.status(400).json({
          message: "Error",
          error: "Order not found"
        })
      } else {
        const orderContent = order.toJSON();
        res.status(200).json({
          message: "Success",
          order: orderContent
        })
      }
    } else { // Take order
      res.status(200).json({
        message: "Success",
        order: null
      })
    }

  }

})

app.get('/attandent/checkin', async (req, res) => {
  const phoneNumber = req.query.cid;
  const flightNumber = req.query.fid;
  const user = await User.findOne({ cellPhone: phoneNumber });
  const flight = await Flight.findOne({ flightNumber: flightNumber });

  if (user == undefined) {
    res.status(400).json({
      message: 'Error',
      error: 'User not found'
    });
  } else { // Found User
    if (flight) { // and found flights
      // FIXIT: get all ordr in a particualr flight
      async () => {
        let ordersArr = [];
        await flight.orders.forEach(async orderId => {
          // ordersArr.push(await Order.findById(orderId))
          let order = await Order.findById(orderId);
          orderJson = order.toJSON()
          // console.log(order)
          if (order) {
            console.log(orderJson)
            ordersArr.push(orderJson)
          }
        });
        console.log(ordersArr)
        res.status(200).json({
          message: 'Success',
          orders: ordersArr
        })
      }


    } else { // no flights info
      res.status(400).json({
        message: 'Error',
        error: 'Flight not found'
      })

    }

  }

})


app.listen(3000, () => {
  console.log('serve on 3000');
})