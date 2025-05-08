const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const Task = mongoose.model('Task', new mongoose.Schema({
    userId: String,
    title: String,
    completed: Boolean,
}));

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('No token');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(403).send('Invalid');
    }
}

app.use(auth);

app.post('/tasks', async (req, res) => {
    const task = await Task.create({ userId: req.userId, ...req.body });
    res.send(task);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({ userId: req.userId });
    res.send(tasks);
});

app.listen(4001, () => console.log('Task running on 4001'));
