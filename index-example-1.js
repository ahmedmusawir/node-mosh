const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Universe');
});

app.get('/api/users', (req, res) => {
  res.send([1, 2, 3]);
});

app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params); // http://localhost:5000/api/posts/2009/8
});

app.get('/api/posts/', (req, res) => {
  res.send(req.query); // http://localhost:5000/api/posts/?sortBy=chang
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
