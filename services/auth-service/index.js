const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();  // To load environment variables

const app = express();
app.use(express.json());  // Middleware to parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define a User schema
const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
}));

// Registration route
app.post('/register', async (req, res) => {
    try {
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Save user to DB
        const newUser = new User({ email: req.body.email, password: hashedPassword });
        await newUser.save();

        res.send('Registered');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

// Start the server
app.listen(4000, () => console.log('Auth service running on port 4000'));
