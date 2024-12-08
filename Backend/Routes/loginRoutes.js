const express = require('express');
const router = express.Router();
const faceapi = require('@tensorflow-models/face-api'); // For Euclidean distance
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/api/login', async (req, res) => {
    const { descriptor } = req.body;

    // Validate the descriptor
    if (!descriptor || !Array.isArray(descriptor)) {
        return res.status(400).json({ message: 'Invalid or missing descriptor' });
    }

    const inputDescriptor = new Float32Array(descriptor);

    try {
        // Fetch all users and their face descriptors
        const users = await prisma.user.findMany({
            select: { id: true, email: true, faceDescriptor: true }, // Select only required fields
        });

        for (const user of users) {
            const savedDescriptor = new Float32Array(JSON.parse(user.faceDescriptor)); // Convert back to Float32Array
            const distance = faceapi.euclideanDistance(inputDescriptor, savedDescriptor);

            if (distance < 0.6) { // Adjust the threshold as needed
                return res.json({ success: true, message: 'Login successful', user });
            }
        }

        res.status(401).json({ success: false, message: 'Face not recognized' });
    } catch (error) {
        console.error('Error during face login:', error);
        res.status(500).json({ message: 'Error during face login' });
    }
});

module.exports = router;
