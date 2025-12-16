
const express = require('express');
const fs = require('fs');
const router = express.Router();

const filePath = __dirname + '/../data/courses.json';

router.get('/', (req, res) => {
    const courses = JSON.parse(fs.readFileSync(filePath));
    res.json(courses);
});

router.post('/', (req, res) => {
    const role = req.headers['authorization'];
    if (role !== 'teacher') return res.status(403).json({ message: 'Unauthorized' });
    const courses = JSON.parse(fs.readFileSync(filePath));
    courses.push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(courses, null, 2));
    res.json({ message: 'Course added' });
});

router.put('/:id', (req, res) => {
    const role = req.headers['authorization'];
    if (role !== 'teacher') return res.status(403).json({ message: 'Unauthorized' });
    const courses = JSON.parse(fs.readFileSync(filePath));
    const index = courses.findIndex(c => c.id === req.params.id);
    if (index !== -1) {
        courses[index] = req.body;
        fs.writeFileSync(filePath, JSON.stringify(courses, null, 2));
        res.json({ message: 'Course updated' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

router.delete('/:id', (req, res) => {
    const role = req.headers['authorization'];
    if (role !== 'teacher') return res.status(403).json({ message: 'Unauthorized' });
    let courses = JSON.parse(fs.readFileSync(filePath));
    courses = courses.filter(c => c.id !== req.params.id);
    fs.writeFileSync(filePath, JSON.stringify(courses, null, 2));
    res.json({ message: 'Course deleted' });
});

module.exports = router;
