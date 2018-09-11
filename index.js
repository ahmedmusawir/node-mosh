const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const users = [
  {
    id: 1,
    name: 'Moose Man 2',
    email: 'moose@email.com',
    phone: '404.219.10021111'
  },
  {
    id: 2,
    name: 'Iron Man 2',
    email: 'sp@email.com',
    phone: '404.123.1244'
  },
  {
    id: 3,
    name: 'Justin Bibo 4',
    email: 'jb1234@email.com',
    phone: '404.123.1234'
  }
];

app.get('/', (req, res) => {
  res.send('Hello Universe');
});

app.get('/api/users', (req, res) => {
  res.send(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User Not Found');
  res.send(user);
});

app.post('/api/users', (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };
  users.push(user);
  res.send(user);
});

app.put('/api/users/:id', (req, res) => {
  //Look up the course
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User Not Found');
  //If not existing, return 404 - Bad request

  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Update course
  user.name = req.body.name;
  user.email = req.body.email;
  user.phone = req.body.phone;
  //Return the updated courses
  res.send(user);
});

app.delete('/api/users/:id', (req, res) => {
  //Look up the user
  //Doesn't Exist, return 404
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User Not Found');
  //Delete User
  const index = users.indexOf(user);
  users.splice(index, 1);

  //Return the same user
  res.send(user);
});

//VALIDATION
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string(),
    phone: Joi.string()
  };

  return Joi.validate(user, schema);
}
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
