import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, default: '' },
    // Plain text: blank lines separate paragraphs, "## " starts a heading, "- " a list item
    content: { type: String, default: '' },
    category: { type: String, default: 'Web Development' },
    tags: { type: [String], default: [] },
    coverImage: { type: String, default: '' },
    author: { type: String, default: 'RJ TechForce' },
    // Optional SEO overrides for the article page
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    isSample: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.model('BlogPost', blogPostSchema);
