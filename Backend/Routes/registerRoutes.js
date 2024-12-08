const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// User Registration Route
router.post('/api/register', async (req, res) => {
    const { email, descriptor } = req.body;

    // Basic validation
    if (!email || !descriptor) {
        return res.status(400).json({ message: 'Email and face descriptor are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Save the new user with the face descriptor
        const user = await prisma.user.create({
            data: {
                email,
                faceDescriptor: descriptor, // Assuming `faceDescriptor` is in your Prisma schema
            },
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

module.exports = router;
