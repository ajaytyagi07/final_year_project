const faceapi = require('@tensorflow-models/face-api'); // Example for Euclidean distance calculation

app.post('/api/login/', async (req, res) => {
    const { descriptor } = req.body;
    const inputDescriptor = new Float32Array(descriptor);

    try {
        // Fetch all users and their face descriptors
        const users = await prisma.user.findMany();

        for (const user of users) {
            const savedDescriptor = new Float32Array(user.faceDescriptor);
            const distance = faceapi.euclideanDistance(inputDescriptor, savedDescriptor);

            if (distance < 0.6) { // Adjust the threshold as needed
                return res.json({ success: true, message: 'Login successful', user });
            }
        }

        res.status(401).json({ success: false, message: 'Face not recognized' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during face login' });
    }
});
