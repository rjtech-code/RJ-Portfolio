import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    authorName: { type: String, required: true, trim: true },
    authorRole: { type: String, trim: true, default: '' },
    quote: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', default: null },
    // Publishing requires the client's documented consent
    consent: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    isSample: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
