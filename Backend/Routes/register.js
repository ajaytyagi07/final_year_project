const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.post('/api/register/', async (req, res) => {
    const { email, descriptor } = req.body;

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
                faceDescriptor: descriptor,
            },
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});
