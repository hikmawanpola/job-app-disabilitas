// backend/src/routes/applications.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get applications by company (untuk company melihat pelamar)
router.get('/company/:companyId', async (req, res) => {
    try {
        const [applications] = await db.execute(`
            SELECT 
                a.id,
                a.status,
                a.created_at,
                j.title as job_title,
                u.name as applicant_name,
                u.email as applicant_email
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            JOIN users u ON a.user_id = u.id
            WHERE j.company_id = ?
            ORDER BY a.created_at DESC
        `, [req.params.companyId]);

        res.json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get applications by user (untuk user melihat history lamaran)
router.get('/user/:userId', async (req, res) => {
    try {
        const [applications] = await db.execute(`
            SELECT 
                a.id,
                a.status,
                a.created_at,
                j.title as job_title,
                c.name as company_name
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            JOIN companies c ON j.company_id = c.id
            WHERE a.user_id = ?
            ORDER BY a.created_at DESC
        `, [req.params.userId]);

        res.json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update application status (untuk company mengupdate status lamaran)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await db.execute(
            'UPDATE applications SET status = ? WHERE id = ?',
            [status, req.params.id]
        );

        res.json({
            success: true,
            message: 'Application status updated'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Create new application
router.post('/', async (req, res) => {
    try {
        const { job_id, user_id } = req.body;

        // 1. Check for duplicate application
        const [existing] = await db.execute(
            'SELECT id FROM applications WHERE job_id = ? AND user_id = ?',
            [job_id, user_id]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: 'You have already applied for this job.' });
        }

        // 2. Insert new application
        const [result] = await db.execute(
            "INSERT INTO applications (job_id, user_id, status) VALUES (?, ?, 'Pending')",
            [job_id, user_id]
        );
        
        res.status(201).json({ id: result.insertId, message: 'Application submitted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;