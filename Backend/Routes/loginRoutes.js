const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Use a strong secret key

// User Login Route
router.post('/api/login', async (req, res) => {
    const { email, descriptor } = req.body;

    if (!email || !descriptor) {
        return res.status(400).json({ message: 'Email and face descriptor are required' });
    }

    try {
        // Find the user by email
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Convert stored descriptor and compare with detected descriptor
        const storedDescriptor = JSON.parse(user.faceDescriptor);
        const inputDescriptor = JSON.parse(descriptor);

        // Calculate similarity score (Euclidean distance)
        const distance = Math.sqrt(storedDescriptor.reduce((sum, value, index) => 
            sum + Math.pow(value - inputDescriptor[index], 2), 0));

        // Define a threshold (adjust based on testing)
        const threshold = 0.5; 

        if (distance > threshold) {
            return res.status(401).json({ message: 'Face mismatch. Authentication failed.' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});

module.exports = router;
