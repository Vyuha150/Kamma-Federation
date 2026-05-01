import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import HallOfFame from '../models/HallOfFame.js';
import Event from '../models/Event.js';
import Club from '../models/Club.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ---- HALL OF FAME ----
router.get('/hof', async (req, res) => {
    try {
        const items = await HallOfFame.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching' });
    }
});

router.post('/hof', authenticate, upload.single('image'), async (req: any, res: any) => {
    try {
        const { name, category, role, desc, verified } = req.body;
        let imageUrl = req.body.image; // fallback to URL if provided string
        if (req.file) {
            imageUrl = '/uploads/' + req.file.filename;
        }
        const item = new HallOfFame({ name, category, role, desc, verified: verified === 'true', image: imageUrl || '' });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error creating' });
    }
});

router.put('/hof/:id', authenticate, upload.single('image'), async (req: any, res: any) => {
    try {
        const updateData = { ...req.body };
        if (updateData.verified !== undefined) updateData.verified = updateData.verified === 'true';
        if (req.file) {
            updateData.image = '/uploads/' + req.file.filename;
        }
        const item = await HallOfFame.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error updating' });
    }
});

router.delete('/hof/:id', authenticate, async (req, res) => {
    try {
        await HallOfFame.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting' });
    }
});

// ---- EVENTS ----
router.get('/events', async (req, res) => {
    try {
        const items = await Event.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching' });
    }
});

router.post('/events', authenticate, upload.single('image'), async (req: any, res: any) => {
    try {
        const { title, date, location, type, description } = req.body;
        let imageUrl = req.body.image;
        if (req.file) imageUrl = '/uploads/' + req.file.filename;
        const item = new Event({ title, date, location, type, description, image: imageUrl || '' });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error creating' });
    }
});

router.put('/events/:id', authenticate, upload.single('image'), async (req: any, res: any) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.image = '/uploads/' + req.file.filename;
        const item = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error updating' });
    }
});

router.delete('/events/:id', authenticate, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting' });
    }
});

// ---- CLUBS ----
router.get('/clubs', async (req, res) => {
    try {
        const items = await Club.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching' });
    }
});

router.post('/clubs', authenticate, upload.single('image'), async (req: any, res: any) => {
    try {
        const { name, tagline, memberCount } = req.body;
        let imageUrl = req.body.image;
        if (req.file) imageUrl = '/uploads/' + req.file.filename;
        const item = new Club({ name, tagline, memberCount: parseInt(memberCount) || 0, image: imageUrl || '' });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error creating' });
    }
});

router.put('/clubs/:id', authenticate, upload.single('image'), async (req: any, res: any) => {
    try {
        const updateData = { ...req.body };
        if (updateData.memberCount) updateData.memberCount = parseInt(updateData.memberCount);
        if (req.file) updateData.image = '/uploads/' + req.file.filename;
        const item = await Club.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error updating' });
    }
});

router.delete('/clubs/:id', authenticate, async (req, res) => {
    try {
        await Club.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting' });
    }
});

export default router;
