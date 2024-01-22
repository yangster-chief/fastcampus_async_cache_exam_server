const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoRoutes = require('./todoRoutes'); // Import the routes

const PORT = process.env.PORT || 3000;
const app = express();
const DB_URI = 'mongodb://mongo:27017/toDoApp';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Use the ToDo routes
app.use('/todo', todoRoutes);

mongoose.connect(DB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to the database.');
    app.listen(PORT, () => {
      console.log('Listening on port: ' + PORT);
    });
  })
  .catch(err => {
    console.error('Database connection error', err);
  });
