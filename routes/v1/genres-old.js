const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genres = [
  {
    id: 1,
    name: 'Action'
  },
  {
    id: 2,
    name: 'Comedy'
  },
  {
    id: 3,
    name: 'Drama'
  }
];

router.get('/', (req, res) => {
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(u => u.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('genre Not Found');
  res.send(genre);
});

router.post('/', (req, res) => {
  const { error } = validategenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

router.put('/:id', (req, res) => {
  //Look up the course
  const genre = genres.find(u => u.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('genre Not Found');
  //If not existing, return 404 - Bad request

  const { error } = validategenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Update course
  genre.name = req.body.name;
  //Return the updated courses
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  //Look up the genre
  //Doesn't Exist, return 404
  const genre = genres.find(u => u.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre Not Found To Delete');
  //Delete genre
  const index = genres.indexOf(genre);

  genres.splice(index, 1);

  //Return the same genre
  res.send(genre);
});

//VALIDATION
function validategenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
