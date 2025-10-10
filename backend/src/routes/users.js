// backend/src/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all users
router.get('/', async (req, res) => {
    try {
        const [users] = await db.execute('SELECT id, name, email, role FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user by id
router.get('/:id', async (req, res) => {
    try {
        const [users] = await db.execute(
            'SELECT id, name, email, role FROM users WHERE id = ?',
            [req.params.id]
        );
        if (users.length > 0) {
            res.json(users[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;