import mongoose from 'mongoose';

export const PROJECT_TYPES = ['Business Website', 'Web Application', 'SaaS Platform', 'E-Commerce', 'UI/UX Design', 'Other'];
export const INQUIRY_STATUSES = ['New', 'Contacted', 'In Progress', 'Closed'];

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true },
    projectType: {
        type: String,
        required: true,
        enum: PROJECT_TYPES
    },
    projectDetails: { type: String, required: true },
    status: {
        type: String,
        enum: INQUIRY_STATUSES,
        default: 'New'
    },
    // CRM follow-up (admin only)
    notes: { type: String, default: '' },
    followUpDate: { type: Date, default: null },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model('Contact', contactSchema);
