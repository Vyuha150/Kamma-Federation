import express from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { authenticate, requireSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

// Get all admins (only superadmin can see all, regular admin might only see themselves but we'll restrict to superadmin for now)
router.get('/', requireSuperAdmin, async (req, res) => {
    try {
        const admins = await Admin.find().select('-password');
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins' });
    }
});

// Add new admin
router.post('/', requireSuperAdmin, async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existing = await Admin.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
            role: role || 'admin'
        });

        await admin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin' });
    }
});

// Update admin (Superadmin can update any, admin can update themselves maybe, but here we enforce superadmin or self)
router.put('/:id', async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        // Only superadmin can update others
        if (req.user.role !== 'superadmin' && req.user.id !== id) {
            return res.status(403).json({ message: 'Not authorized to update this admin' });
        }

        const updateData: any = { name, email };

        // Only superadmin can change roles
        if (req.user.role === 'superadmin' && role) {
            updateData.role = role;
        }

        const admin = await Admin.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin' });
    }
});

// Change password
router.post('/:id/change-password', async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        // Only superadmin or the user themselves can change password
        if (req.user.role !== 'superadmin' && req.user.id !== id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await Admin.findByIdAndUpdate(id, { password: hashedPassword });
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password' });
    }
});

// Delete admin
router.delete('/:id', requireSuperAdmin, async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin' });
    }
});

export default router;
