const express = require('express');
const app = express();

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
  if (!user) res.status(404).send('User Not Found');
  res.send(user);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
