import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const login = async (req, res) => {
    const { username, password } = req.body;
    const secretKey = process.env.AUTH_SECRET_KEY;

    try {
        // Find user by username
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Successfully logged in!', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default login;