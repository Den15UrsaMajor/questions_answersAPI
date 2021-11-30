require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 4000;
const routes = require('./routes');

mongoose
  .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use('/api', routes);
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    })
  })