const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// User Registration Route
router.post('/api/register', async (req, res) => {
    const { email, descriptor } = req.body;

    if (!email || !descriptor) {
        return res.status(400).json({ message: 'Email and face descriptor are required' });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await prisma.user.create({
            data: {
                email,
                faceDescriptor: descriptor, // Save descriptor as JSON string
            },
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});


module.exports = router;
