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

app.get('/attendant/checkin', async (req, res) => {
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

      var completed = flight.orders.length;
      console.log(completed);

      let ordersArr = [];
      await flight.orders.forEach(async orderId => {
        // console.log(orderId);
        // ordersArr.push(await Order.findById(orderId))
        let order = await Order.findById(orderId);

        if (order) {
          console.log(order);
          ordersArr.push(order);
          completed--;
          console.log(completed);
          // console.log(ordersArr);

          if (completed == 0) {
            res.status(200).send(ordersArr);
          }
        }
      }
      );
    } else { // no flights info
      res.status(400).json({
        message: 'Error',
        error: 'Flight not found'
      })
    }
  }
});

app.post('/customer/takeorder', async (req, res) => {
  const type = req.query.type;
  const flightNumber = req.query.fid;
  const phoneNumber = req.query.cid;

  console.log(type);
  console.log(flightNumber);
  console.log(phoneNumber);

  Order.deleteMany({ flightNumber: flightNumber, cellPhone: phoneNumber }, function (err) {
    if (err) return handleError(err);
  });
  User.deleteMany({ cellPhone: phoneNumber, flightNumber: flightNumber }, function (err) {
    if (err) return handleError(err);
  });

  let orderId = null
  try {
    const newOrder = new Order({ type: type, flightNumber: flightNumber, cellPhone: phoneNumber });
    let saveOrder_save = await newOrder.save(); //when fail its goes to catch
    console.log(saveOrder_save); //when success it print.

    const newUser = new User({ cellPhone: phoneNumber, flightNumber: flightNumber, orderId: newOrder._id });
    orderId = newOrder._id;
    let newUser_save = await newUser.save(); //when fail its goes to catch
    console.log(newUser_save); //when success it print.

    const flight = await Flight.findOne({ flightNumber: flightNumber });
    flight.orders.push(newOrder);
    flight.cellPhones.push(phoneNumber);
  } catch (err) {
    console.log('err' + err);
    res.status(500).send(err);
  }

  res.status(200).json({
    message: "Success",
    orderId: orderId
  });
});

app.listen(3000, () => {
  console.log('serve on 3000');
})