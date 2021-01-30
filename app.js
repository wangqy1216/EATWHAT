const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello EATWHAT');
})

app.listen(3000, () => {
  console.log('serve on 3000');
})