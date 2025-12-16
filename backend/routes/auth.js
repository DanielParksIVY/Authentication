
const express = require('express');
const fs = require('fs');
const router = express.Router();

const users = JSON.parse(fs.readFileSync(__dirname + '/../data/users.json'));

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, user: { username: user.username, role: user.role } });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

module.exports = router;
