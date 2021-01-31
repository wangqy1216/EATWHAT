const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const Flight = require('./server/models/flight.model.js');
const Order = require('./server/models/order.model.js');
const User = require('./server/models/user.model.js');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSid, authToken)
const client = require('twilio')(accountSid, authToken);

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

    client.messages.create({ body: 'Your order Number is ' + orderId + ' Thanks.', messagingServiceSid: 'MG02a34f47806e26293fe33fc6d9d705f0', to: phoneNumber })
      .then(message => console.log(message.sid))
      .done();

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


app.get('/flights', async (req, res) => {
  const flightNumber = req.query.fid;
  let isServing = false;
  await axios.get('https://flights-engine.herokuapp.com/flights?date=2020-01-01')
    .then(response => {
      response.data.forEach(flight => {
        if (flight.flightNumber === flightNumber) {
          if (flight.distance > 1000) {
            isServing = true
          }
        }
      })
    })
    .catch(error => {
      console.log(error);
    });
  if (isServing) {
    const flight = await Flight.findOne({ flightNumber: flightNumber });
    const cellArr = flight.cellPhones

    cellArr.forEach(phNum => {
      client.messages.create({ body: 'You can order meal on our app "EATWHAT"', messagingServiceSid: 'MG02a34f47806e26293fe33fc6d9d705f0', to: phNum })
        .then(message => console.log(message.sid))
        .done();
    })
  }
  res.send("Success")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});