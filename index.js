// index.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to handle static files, if you have any
app.use(express.static('public'));

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
