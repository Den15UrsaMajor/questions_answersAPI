require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 4000;
const router = require('./routes')

mongoose
  .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      const app = express();
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(express.json());
      app.use('/api', router);
      app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
      })
  })