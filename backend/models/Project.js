import mongoose from 'mongoose';

export const PROJECT_STATUSES = ['Planning', 'In Progress', 'Review', 'Completed', 'On Hold'];

// Internal client projects (admin only, never public)
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', default: null },
    clientName: { type: String, trim: true, default: '' },
    status: { type: String, enum: PROJECT_STATUSES, default: 'Planning' },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    startDate: { type: Date, default: null },
    deadline: { type: Date, default: null },
    budget: { type: Number, min: 0, default: null },
    notes: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
