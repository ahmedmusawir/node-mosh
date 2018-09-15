const express = require('express');
const app = express();
const genres = require('../routes/v1/genres');
const home = require('../routes/home');

app.use(express.json());
app.use('/', home);
app.use('/api/v1/genres', genres);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
