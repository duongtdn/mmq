"use strict"

const path = require('path');
const express = require('express');

const app = express();

app.use('/', express.static(path.join(__dirname, '../', 'dist')));
app.use('/assets/Pictures/MathMadQuick.png', (req,res) => res.sendFile(path.join(__dirname, '../', "assets/Pictures/MathMadQuick.png")) );

const PORT = 3100;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is listening at port ${PORT}`);
  }
});
