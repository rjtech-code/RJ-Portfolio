import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    notes: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Client', clientSchema);
