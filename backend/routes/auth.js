const express = require('express');
const bcrypt = require('bcrypt');
const { createUser, findUser } = require('../models/user');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (findUser(username)) return res.status(400).json({ message: 'User exists' });
    await createUser(username, password);
    res.json({ message: 'User created successfully' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = findUser(username);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid password' });

    req.session.user = username;
    res.json({ message: 'Login successful' });
});

router.get('/profile', (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });
    res.json({ message: `Hello ${req.session.user}` });
});

module.exports = router;
