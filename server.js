require('dotenv').config();
const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const app = require('express')();

app.use(bodyParser.json());

const db = require('./lib/pool.js');

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});

