const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const db = require('./helpers/db');
const router = require('./routes');


const app = express();
const port = 3000;

// Config .env
dotenv.config();

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Connect MongoDB server
db.connect();

// Use body-parser
app.use(express.json()); // for parsing application/json

// Use router
app.use(router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
