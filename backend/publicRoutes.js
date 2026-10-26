import express from 'express';
import PortfolioItem from './models/PortfolioItem.js';
import BlogPost from './models/BlogPost.js';
import Testimonial from './models/Testimonial.js';
import PageContent from './models/PageContent.js';
import { getSiteSettings } from './models/Setting.js';

// Read-only public data: only published content, never admin-only fields
const router = express.Router();

const PORTFOLIO_SUMMARY = 'title slug category summary technologies image imageAlt isSample featured publishedAt';
const POST_SUMMARY = 'title slug excerpt category tags coverImage author metaTitle metaDescription isSample publishedAt updatedAt';

const cache = (res) => res.set('Cache-Control', 'public, max-age=60');

router.get('/bootstrap', async (req, res) => {
    try {
        const [settings, pages, portfolio, posts, testimonials] = await Promise.all([
            getSiteSettings(),
            PageContent.find().select('-_id key metaTitle metaDescription heading intro reviewed').lean(),
            PortfolioItem.find({ status: 'published' }).sort({ sortOrder: 1, publishedAt: -1 }).select(`-_id ${PORTFOLIO_SUMMARY}`).lean(),
            BlogPost.find({ status: 'published' }).sort({ publishedAt: -1 }).select(`-_id ${POST_SUMMARY}`).lean(),
            Testimonial.find({ status: 'published', consent: true, isSample: false }).sort({ updatedAt: -1 }).select('-_id authorName authorRole quote').lean(),
        ]);
        delete settings.updatedAt;
        cache(res).json({ settings, pages, portfolio, posts, testimonials });
    } catch (error) {
        console.error(`[PUBLIC bootstrap] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

const bySlug = (Model, fields) => async (req, res) => {
    try {
        if (!/^[a-z0-9-]{1,80}$/.test(req.params.slug)) return res.status(404).json({ message: 'Not found' });
        const item = await Model.findOne({ slug: req.params.slug, status: 'published' }).select(`-_id ${fields}`).lean();
        if (!item) return res.status(404).json({ message: 'Not found' });
        cache(res).json(item);
    } catch (error) {
        console.error(`[PUBLIC ${Model.modelName}] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

router.get('/portfolio/:slug', bySlug(PortfolioItem, `${PORTFOLIO_SUMMARY} description challenge solution results highlights updatedAt`));
router.get('/blog/:slug', bySlug(BlogPost, `${POST_SUMMARY} content`));

export default router;
