import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true },
    projectType: { 
        type: String, 
        required: true,
        enum: ['Business Website', 'Web Application', 'SaaS Platform', 'E-Commerce', 'UI/UX Design', 'Other']
    },
    projectDetails: { type: String, required: true },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'In Progress', 'Closed'],
        default: 'New'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model('Contact', contactSchema);
