const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// User schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ error: 'Username already taken' });

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Save new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ error: err.message || 'User registration failed' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    // Success — send redirect URL to frontend
    res.status(200).json({ 
      message: 'Login successful', 
      redirect: 'https://eiko919.github.io/bookflix-frontend/site-principal-2.html' 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Root route (test)
app.get('/', (req, res) => {
  res.send('Hello, MongoDB Atlas!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
