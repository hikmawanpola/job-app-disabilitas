// backend/src/routes/companies.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all companies
router.get('/', async (req, res) => {
    try {
        const [companies] = await db.execute('SELECT * FROM companies');
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get company by id
router.get('/:id', async (req, res) => {
    try {
        const [companies] = await db.execute('SELECT * FROM companies WHERE id = ?', [req.params.id]);
        if (companies.length > 0) {
            res.json(companies[0]);
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
