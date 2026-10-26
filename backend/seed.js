// One-off: inserts sample portfolio items, blog posts and (unpublished) testimonials
// into EMPTY collections only. Never overwrites existing data.
// Usage (from the backend folder, with MONGODB_URI set): node seed.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import PortfolioItem from './models/PortfolioItem.js';
import BlogPost from './models/BlogPost.js';
import Testimonial from './models/Testimonial.js';
import { samplePortfolio, samplePosts, sampleTestimonials } from './seedData.js';

dotenv.config();

if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set.');
    process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);
console.log(`[SEED] Connected to ${mongoose.connection.host}`);

for (const [Model, items] of [[PortfolioItem, samplePortfolio], [BlogPost, samplePosts], [Testimonial, sampleTestimonials]]) {
    const count = await Model.countDocuments();
    if (count > 0) {
        console.log(`[SEED] ${Model.modelName}: ${count} existing record(s), skipped`);
        continue;
    }
    await Model.insertMany(items);
    console.log(`[SEED] ${Model.modelName}: inserted ${items.length} sample record(s)`);
}

await mongoose.disconnect();
