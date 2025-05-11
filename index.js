// index.js
require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DB_URI;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.log("MongoDB connection error:", err));

// Route
app.get('/', (req, res) => {
  res.send('Hello, MongoDB Atlas!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
