

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

// index.js
require('dotenv').config(); // Make sure to load environment variables from a .env file
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// Load environment variables from .env file
const DB_URI = process.env.DB_URI; // Store connection string in your .env file

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.log('Error connecting to MongoDB Atlas:', error));

// Example route
app.get('/', (req, res) => {
  res.send('Hello, MongoDB Atlas!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log(err));

const mongoURI = process.env.MONGO_URI; // Access your connection string from the .env file

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));
