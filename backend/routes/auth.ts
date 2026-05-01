import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Utility route to help set up initial superadmin if DB is empty
router.post('/setup', async (req, res) => {
    try {
        const count = await Admin.countDocuments();
        if (count > 0) {
            return res.status(403).json({ message: 'Admin already initialized' });
        }

        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
            role: 'superadmin'
        });

        await admin.save();
        res.status(201).json({ message: 'Superadmin created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error setting up initial admin' });
    }
});

export default router;
