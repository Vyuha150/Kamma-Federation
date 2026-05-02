import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    education: { type: String },
    semester: { type: String },
    district: { type: String },
    philosophy: { type: String },
    failure: { type: String },
    goal: { type: String },
    interest: { type: String },
    contribution: { type: String },
    financial: { type: String },
    club: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    date: { type: Date, default: Date.now }
});

const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
export default Submission as any;
