import mongoose from 'mongoose';

const HallOfFameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    role: { type: String, required: true },
    desc: { type: String, required: true },
    verified: { type: Boolean, default: true },
    image: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('HallOfFame', HallOfFameSchema);
