import mongoose from 'mongoose';

const ClubSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    memberCount: { type: Number, default: 0 },
    image: { type: String }
}, { timestamps: true });

export default mongoose.model('Club', ClubSchema);
