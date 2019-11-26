// This is the old way using native HTTP module

// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.end("Hello World.");
// });

// server.listen(8080, () => {
//   console.log('Server is listening to port 8080');
// });

/******************************************************************/

// This is the standard way using EXPRESS library
const express = require('express');
const posts = require('./posts');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>THIS IS HOME PAGE</h1>');
});

app.get('/api', (req, res) => {
  res.send({
    error: 'NOT_FOUND',
    message: 'API not found.'
  });
});

app.get('/api/posts', (req, res) => {
  res.send(posts);
});

app.listen(8080, () => {
  console.log('Server is listening to port 8080');
});
