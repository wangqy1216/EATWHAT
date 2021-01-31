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

app.get('/user', async (req, res) => {
  const user = await User.findOne({ cellPhone: req.params.userId });
  const flight = await Flight.find({ flightNumber: req.params.flightNumber });
  
  if(user == undefined){
    res.status(400).json({
      message: 'User Not Found'
    });
  } else {
    res.status(400).json({
      user: user.data.cellPhone,
      // flight: flight.data.flightNumber
    });  
  }
  
})


app.listen(3000, () => {
  console.log('serve on 3000');
})