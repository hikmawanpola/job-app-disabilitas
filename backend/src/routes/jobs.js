// backend/src/routes/jobs.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const [jobs] = await db.execute(`
            SELECT 
                j.*, 
                c.name as company,
                COUNT(a.id) as applicant_count
            FROM jobs j 
            JOIN companies c ON j.company_id = c.id
            LEFT JOIN applications a ON a.job_id = j.id
            GROUP BY j.id
        `);
        
        const formattedJobs = jobs.map(job => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            summary: job.description,
            tags: [job.type],
            created_at: job.created_at,
            applicant_count: job.applicant_count
        }));
        
        res.status(200).json(formattedJobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get recommended jobs
router.get('/recommended', async (req, res) => {
    try {
        const [jobs] = await db.execute(`
            SELECT 
                j.*, 
                c.name as company,
                COUNT(a.id) as applicant_count
            FROM jobs j 
            JOIN companies c ON j.company_id = c.id
            LEFT JOIN applications a ON a.job_id = j.id
            GROUP BY j.id
            ORDER BY applicant_count DESC
            LIMIT 5
        `);
        
        const formattedJobs = jobs.map(job => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            summary: job.description,
            tags: [job.type],
            created_at: job.created_at,
            applicant_count: job.applicant_count
        }));
        
        res.status(200).json({ success: true, jobs: formattedJobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get jobs by company
router.get('/company/:companyId', async (req, res) => {
    try {
        const { companyId } = req.params;
        const [jobs] = await db.execute(
            `SELECT 
                j.*, 
                c.name as company,
                COUNT(a.id) as applicant_count
             FROM jobs j
             JOIN companies c ON j.company_id = c.id
             LEFT JOIN applications a ON a.job_id = j.id
             WHERE j.company_id = ?
             GROUP BY j.id`, 
            [companyId]
        );
        
        const formattedJobs = jobs.map(job => ({
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            summary: job.description,
            tags: [job.type],
            created_at: job.created_at,
            applicant_count: job.applicant_count
        }));
        
        res.status(200).json(formattedJobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get job by id
router.get('/:id', async (req, res) => {
    try {
        const [jobs] = await db.execute(
            'SELECT * FROM jobs WHERE id = ?', 
            [req.params.id]
        );
        if (jobs.length > 0) {
            res.status(200).json(jobs[0]);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new job
router.post('/', async (req, res) => {
    try {
        const { title, company_id, location, description, type } = req.body;
        
        if (!title || !company_id || !location || !description || !type) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const [result] = await db.execute(
            'INSERT INTO jobs (title, company_id, location, description, type) VALUES (?, ?, ?, ?, ?)',
            [title, company_id, location, description, type]
        );

        res.status(201).json({ id: result.insertId, message: 'Job created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // First, delete related applications
        await connection.execute(
            'DELETE FROM applications WHERE job_id = ?',
            [req.params.id]
        );

        // Then, delete the job
        const [result] = await connection.execute(
            'DELETE FROM jobs WHERE id = ?',
            [req.params.id]
        );

        await connection.commit();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Job and associated applications deleted successfully' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    } finally {
        connection.release();
    }
});

module.exports = router;