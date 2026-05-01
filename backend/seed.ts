import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/uksf-admin';

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB.');

        // Check if superadmin exists
        const existing = await Admin.findOne({ email: 'admin@uksf.org' });
        if (existing) {
            console.log('Superadmin user already exists.');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('supersecretpassword', salt);

        const superAdmin = new Admin({
            name: 'Master Admin',
            email: 'admin@uksf.org',
            password: hashedPassword,
            role: 'superadmin'
        });

        await superAdmin.save();
        console.log('Superadmin user successfully seeded!');
        console.log('Login: admin@uksf.org');
        console.log('Password: supersecretpassword');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding DB:', error);
        process.exit(1);
    }
}

seed();
