const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose
  .connect(`mongodb://localhost:27017/api`, {useNewUrlParser: true})
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use('/api', routes);
    app.listen(4000, () => {
      console.log('Server is listening at http://localhost:4000');
    })
  })