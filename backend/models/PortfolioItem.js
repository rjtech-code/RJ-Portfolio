import mongoose from 'mongoose';

export const PORTFOLIO_CATEGORIES = ['Websites', 'Web Applications', 'SaaS Platforms', 'Dashboards', 'E-Commerce'];

const portfolioItemSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, enum: PORTFOLIO_CATEGORIES, required: true },
    summary: { type: String, default: '' },
    description: { type: String, default: '' },
    challenge: { type: String, default: '' },
    solution: { type: String, default: '' },
    results: { type: String, default: '' },
    technologies: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    image: { type: String, default: '' },
    imageAlt: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    // Sample/illustrative content: shown with a "Sample" label and never indexed
    isSample: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    publishedAt: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.model('PortfolioItem', portfolioItemSchema);
