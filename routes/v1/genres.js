const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../../models/genre');

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('Single genre Not Found');
  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre = new Genre({ name: req.body.name });
  genres = await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Look up the course
  //Update course
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );
  //If not existing, return 404 - Bad request
  if (!genre) return res.status(404).send('genre Not Found');

  //Return the updated courses
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  //Look up the genre & delete
  const genre = await Genre.findByIdAndRemove(req.params.id);
  //Doesn't Exist, return 404
  if (!genre) return res.status(404).send('Genre Not Found To Delete');

  //Return the same genre
  res.send(genre);
});

module.exports = router;
