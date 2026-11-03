import mongoose from 'mongoose';

export const PROJECT_TYPES = ['Business Website', 'Web Application', 'SaaS Platform', 'E-Commerce', 'UI/UX Design', 'Other'];
export const INQUIRY_TYPES = ['project_contact', 'demo_request', 'installation_request', 'product_site_contact'];
export const INQUIRY_STATUSES = ['New', 'Contacted', 'In Progress', 'Closed'];

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '', trim: true },
    projectType: { type: String, required: true, enum: PROJECT_TYPES, default: 'Other' },
    projectDetails: { type: String, required: true, trim: true },
    organization: { type: String, default: '', trim: true, maxlength: 200 },
    productName: { type: String, default: '', trim: true, maxlength: 200 },
    studentCount: { type: Number, default: null, min: 0 },
    location: { type: String, default: '', trim: true, maxlength: 200 },
    inquiryType: { type: String, enum: INQUIRY_TYPES, default: 'project_contact', index: true },
    sourceDomain: { type: String, default: 'dev.vultusgo.in', trim: true, maxlength: 255, index: true },
    status: { type: String, enum: INQUIRY_STATUSES, default: 'New' },
    // CRM follow-up (admin only)
    notes: { type: String, default: '' },
    followUpDate: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', contactSchema);
