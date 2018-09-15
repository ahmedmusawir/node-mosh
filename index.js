const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genres = require('./routes/v1/genres');
const movies = require('./routes/v1/movies');
const customers = require('./routes/v1/customers');
const home = require('./routes/home');

mongoose
  .connect(
    'mongodb://localhost:27017/vidly',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB ...'))
  .catch(err => console.error('Could not connect to MongoDB ...'));

app.use(express.json());
app.use('/', home);
app.use('/api/v1/genres', genres);
app.use('/api/v1/movies', movies);
app.use('/api/v1/customers', customers);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
