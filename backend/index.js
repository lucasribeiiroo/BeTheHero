const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.json({
    name: 'Dracula';
  });   
});

app.listen(3333);