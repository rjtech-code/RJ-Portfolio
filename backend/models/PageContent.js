import mongoose from 'mongoose';

// Per-page overrides edited in Admin > Website Content & SEO
const pageContentSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true, trim: true },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    heading: { type: String, default: '' },
    intro: { type: String, default: '' },
    // Draft pages show a notice and are noindex until the owner marks them reviewed
    reviewed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('PageContent', pageContentSchema);
