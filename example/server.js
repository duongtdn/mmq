"use strict"

const path = require('path');
const express = require('express');

const app = express();

app.use('/', express.static(path.join(__dirname, '../', 'dist')));

const PORT = 3100;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is listening at port ${PORT}`);
  }
});
