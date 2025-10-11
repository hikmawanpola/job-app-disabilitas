const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Register route
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        // Check if email already exists
        const [existingUsers] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ 
                success: false,
                message: 'Email already registered' 
            });
        }

        // Insert new user
        const [result] = await db.execute(
            'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
            [email, password, name, role]
        );

        if (role === 'company') {
            // If the user is a company, create a company profile
            await db.execute(
                'INSERT INTO companies (user_id, name, logo_url) VALUES (?, ?, ?)',
                [result.insertId, name, 'default-logo.png']
            );
        }

        // Get the created user
        const [users] = await db.execute(
            'SELECT id, email, name, role FROM users WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                token: 'dev-token',
                role: users[0].role,
                profile: {
                    id: users[0].id,
                    name: users[0].name,
                    email: users[0].email
                }
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed'
        });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        const user = users[0];
        let profile = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatar_url
        };

        // If the user is a company, get the company profile
        if (user.role === 'company') {
            const [companies] = await db.execute('SELECT * FROM companies WHERE user_id = ?', [user.id]);
            if (companies.length > 0) {
                const company = companies[0];
                profile.id = company.id; // Use company ID for profile
                profile.name = company.name;
                profile.logoUrl = company.logo_url;
            }
        }

        res.status(200).json({
            success: true,
            token: 'dev-token', // Replace with actual token generation
            role: user.role,
            profile: profile
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
});

module.exports = router;