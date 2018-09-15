const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../../models/movie');
const { Genre } = require('../../models/genre');

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('Single movie Not Found');
  res.send(movie);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  let movie = new Movie({
    title: req.body.title,
    genre: { _id: genre._id, name: genre.name },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movies = await movie.save();
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Look up the course
  //Update course
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );
  //If not existing, return 404 - Bad request
  if (!movie) return res.status(404).send('movie Not Found');

  //Return the updated courses
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  //Look up the movie & delete
  const movie = await Movie.findByIdAndRemove(req.params.id);
  //Doesn't Exist, return 404
  if (!movie) return res.status(404).send('Movie Not Found To Delete');

  //Return the same movie
  res.send(movie);
});

module.exports = router;
