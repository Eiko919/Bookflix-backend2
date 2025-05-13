// index.js (or your main server file)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS
require('dotenv').config();    // Load environment variables

const app = express();

// Middleware
app.use(cors());  // Enable CORS for all origins (you can customize this)

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DB_URI;

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
