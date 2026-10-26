import express from 'express';
import { requireAdmin } from './auth.js';
import { crudRouter } from './crudRouter.js';
import { sanitize, SLUG_PATTERN, URL_PATTERN, EMAIL_PATTERN } from './validate.js';
import Contact from './Contact.js';
import Project, { PROJECT_STATUSES } from './models/Project.js';
import PortfolioItem, { PORTFOLIO_CATEGORIES } from './models/PortfolioItem.js';
import BlogPost from './models/BlogPost.js';
import Client from './models/Client.js';
import Testimonial from './models/Testimonial.js';
import PageContent from './models/PageContent.js';
import Setting, { getSiteSettings } from './models/Setting.js';

const router = express.Router();
router.use(requireAdmin);

const STATUS = { type: 'string', enum: ['draft', 'published'] };

router.get('/me', (req, res) => {
    res.json({ email: req.admin.sub, expiresAt: req.admin.exp * 1000 });
});

router.use('/projects', crudRouter(Project, {
    sort: { updatedAt: -1 },
    spec: {
        name: { type: 'string', required: true, max: 150, label: 'Project name' },
        clientId: { type: 'objectId', label: 'Client' },
        clientName: { type: 'string', max: 150, label: 'Client name' },
        status: { type: 'string', enum: PROJECT_STATUSES, label: 'Status' },
        progress: { type: 'number', min: 0, max: 100, label: 'Progress' },
        startDate: { type: 'date', label: 'Start date' },
        deadline: { type: 'date', label: 'Deadline' },
        budget: { type: 'number', min: 0, max: 1e10, label: 'Budget' },
        notes: { type: 'text', max: 5000, label: 'Notes' },
    },
    check: (item) =>
        item.startDate && item.deadline && new Date(item.deadline) < new Date(item.startDate)
            ? 'Deadline cannot be before the start date.'
            : null,
}));

router.use('/portfolio', crudRouter(PortfolioItem, {
    sort: { sortOrder: 1, createdAt: -1 },
    slugField: 'title',
    spec: {
        title: { type: 'string', required: true, max: 150, label: 'Title' },
        slug: { type: 'string', max: 80, pattern: SLUG_PATTERN, label: 'Slug' },
        category: { type: 'string', required: true, enum: PORTFOLIO_CATEGORIES, label: 'Category' },
        summary: { type: 'string', max: 300, label: 'Summary' },
        description: { type: 'text', max: 5000, label: 'Overview' },
        challenge: { type: 'text', max: 3000, label: 'Challenge' },
        solution: { type: 'text', max: 3000, label: 'Solution' },
        results: { type: 'text', max: 3000, label: 'Results' },
        technologies: { type: 'stringArray', maxItems: 20, max: 50, label: 'Technologies' },
        highlights: { type: 'stringArray', maxItems: 20, max: 200, label: 'Highlights' },
        image: { type: 'string', max: 500, pattern: URL_PATTERN, label: 'Image URL' },
        imageAlt: { type: 'string', max: 200, label: 'Image alt text' },
        status: { ...STATUS, label: 'Status' },
        isSample: { type: 'boolean', label: 'Sample flag' },
        featured: { type: 'boolean', label: 'Featured' },
        sortOrder: { type: 'number', min: -1000, max: 1000, label: 'Sort order' },
    },
}));

router.use('/posts', crudRouter(BlogPost, {
    sort: { updatedAt: -1 },
    slugField: 'title',
    spec: {
        title: { type: 'string', required: true, max: 160, label: 'Title' },
        slug: { type: 'string', max: 80, pattern: SLUG_PATTERN, label: 'Slug' },
        excerpt: { type: 'string', max: 400, label: 'Excerpt' },
        content: { type: 'text', max: 50000, label: 'Content' },
        category: { type: 'string', max: 60, label: 'Category' },
        tags: { type: 'stringArray', maxItems: 10, max: 40, label: 'Tags' },
        coverImage: { type: 'string', max: 500, pattern: URL_PATTERN, label: 'Cover image URL' },
        author: { type: 'string', max: 100, label: 'Author' },
        metaTitle: { type: 'string', max: 70, label: 'Meta title' },
        metaDescription: { type: 'string', max: 170, label: 'Meta description' },
        status: { ...STATUS, label: 'Status' },
        isSample: { type: 'boolean', label: 'Sample flag' },
    },
    check: (post) => (post.status === 'published' && !post.content?.trim() ? 'Add content before publishing.' : null),
}));

router.use('/clients', crudRouter(Client, {
    sort: { name: 1 },
    spec: {
        name: { type: 'string', required: true, max: 150, label: 'Name' },
        company: { type: 'string', max: 150, label: 'Company' },
        email: { type: 'string', max: 254, pattern: EMAIL_PATTERN, label: 'Email' },
        phone: { type: 'string', max: 30, label: 'Phone' },
        notes: { type: 'text', max: 5000, label: 'Notes' },
    },
}));

router.use('/testimonials', crudRouter(Testimonial, {
    sort: { updatedAt: -1 },
    spec: {
        authorName: { type: 'string', required: true, max: 100, label: 'Name' },
        authorRole: { type: 'string', max: 150, label: 'Role / company' },
        quote: { type: 'text', required: true, max: 1000, label: 'Quote' },
        clientId: { type: 'objectId', label: 'Client' },
        consent: { type: 'boolean', label: 'Consent' },
        status: { ...STATUS, label: 'Status' },
        isSample: { type: 'boolean', label: 'Sample flag' },
    },
    check: (t) => {
        if (t.status !== 'published') return null;
        if (!t.consent) return 'Confirm the client agreed to publication before publishing.';
        if (t.isSample) return 'Sample testimonials cannot be published.';
        return null;
    },
}));

// ---- Website content & SEO overrides ----
const PAGE_KEY = /^[a-z0-9-]{1,60}$/;
const pageSpec = {
    metaTitle: { type: 'string', max: 70, label: 'Meta title' },
    metaDescription: { type: 'string', max: 170, label: 'Meta description' },
    heading: { type: 'string', max: 120, label: 'Heading' },
    intro: { type: 'string', max: 600, label: 'Intro' },
    reviewed: { type: 'boolean', label: 'Reviewed' },
};

router.get('/pages', async (req, res) => {
    try {
        res.json(await PageContent.find().select('-__v -_id').lean());
    } catch (error) {
        console.error(`[ADMIN pages] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/pages/:key', async (req, res) => {
    try {
        if (!PAGE_KEY.test(req.params.key)) return res.status(400).json({ message: 'Invalid page key.' });
        const { data, error } = sanitize(req.body, pageSpec);
        if (error) return res.status(400).json({ message: error });
        const page = await PageContent.findOneAndUpdate(
            { key: req.params.key },
            { $set: data },
            { new: true, upsert: true, runValidators: true, projection: '-__v -_id' }
        );
        res.json(page);
    } catch (error) {
        console.error(`[ADMIN pages] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

// ---- Settings ----
const settingsSpec = {
    companyName: { type: 'string', required: true, max: 100, label: 'Company name' },
    tagline: { type: 'string', max: 150, label: 'Tagline' },
    email: { type: 'string', required: true, max: 254, pattern: EMAIL_PATTERN, label: 'Email' },
    phone: { type: 'string', max: 30, pattern: /^\+?[0-9\s\-().]{7,20}$/, label: 'Phone' },
    whatsapp: { type: 'string', max: 20, pattern: /^[0-9]{8,15}$/, label: 'WhatsApp number' },
    locality: { type: 'string', max: 100, label: 'City' },
    region: { type: 'string', max: 100, label: 'State / region' },
    country: { type: 'string', max: 100, label: 'Country' },
    hours: { type: 'string', max: 100, label: 'Business hours' },
};

const validateSocialLinks = (links) => {
    if (!Array.isArray(links) || links.length > 10) return { error: 'Social links must be a list (max 10).' };
    const clean = [];
    for (const link of links) {
        if (!link || typeof link.name !== 'string' || typeof link.url !== 'string') return { error: 'Each social link needs a name and URL.' };
        const name = link.name.trim();
        const url = link.url.trim();
        if (!name || name.length > 40) return { error: 'Social link names must be 1-40 characters.' };
        if (!/^https:\/\/[^\s<>"']+$/.test(url) || url.length > 300) return { error: `Invalid URL for ${name}.` };
        clean.push({ name, url });
    }
    return { value: clean };
};

router.get('/settings', async (req, res) => {
    try {
        res.json(await getSiteSettings());
    } catch (error) {
        console.error(`[ADMIN settings] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/settings', async (req, res) => {
    try {
        const { socialLinks, ...rest } = req.body || {};
        const { data, error } = sanitize(rest, settingsSpec);
        if (error) return res.status(400).json({ message: error });
        const social = validateSocialLinks(socialLinks ?? []);
        if (social.error) return res.status(400).json({ message: social.error });
        await Setting.findOneAndUpdate(
            { key: 'site' },
            { $set: { ...data, socialLinks: social.value } },
            { upsert: true, runValidators: true }
        );
        res.json(await getSiteSettings());
    } catch (error) {
        console.error(`[ADMIN settings] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

// ---- Overview statistics ----
const ACTIVE_STATUSES = ['Planning', 'In Progress', 'Review'];

router.get('/stats', async (req, res) => {
    try {
        const now = new Date();
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        const [
            enquiriesTotal, enquiriesNew, followUpsDue, projectsActive, projectsCompleted,
            budgetTotals, portfolioPublished, postsPublished, postsDraft, monthly,
            recentEnquiries, recentProjects, recentPosts, upcomingDeadlines, enquiriesByStatus,
        ] = await Promise.all([
            Contact.countDocuments(),
            Contact.countDocuments({ status: 'New' }),
            Contact.countDocuments({ followUpDate: { $lt: endOfToday }, status: { $ne: 'Closed' } }),
            Project.countDocuments({ status: { $in: ACTIVE_STATUSES } }),
            Project.countDocuments({ status: 'Completed' }),
            Project.aggregate([
                { $match: { budget: { $gt: 0 } } },
                { $group: { _id: { $in: ['$status', ACTIVE_STATUSES] }, total: { $sum: '$budget' }, completed: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, '$budget', 0] } } } },
            ]),
            PortfolioItem.countDocuments({ status: 'published' }),
            BlogPost.countDocuments({ status: 'published' }),
            BlogPost.countDocuments({ status: 'draft' }),
            Contact.aggregate([
                { $match: { createdAt: { $gte: sixMonthsAgo } } },
                { $group: { _id: { y: { $year: '$createdAt' }, m: { $month: '$createdAt' } }, count: { $sum: 1 } } },
            ]),
            Contact.find().sort({ createdAt: -1 }).limit(5).select('fullName projectType status createdAt').lean(),
            Project.find().sort({ updatedAt: -1 }).limit(5).select('name status progress updatedAt').lean(),
            BlogPost.find().sort({ updatedAt: -1 }).limit(5).select('title status updatedAt').lean(),
            Project.find({ status: { $in: ACTIVE_STATUSES }, deadline: { $ne: null } }).sort({ deadline: 1 }).limit(5).select('name deadline progress').lean(),
            Contact.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
        ]);

        const pipelineValue = budgetTotals.find((g) => g._id === true)?.total || 0;
        const completedValue = budgetTotals.reduce((sum, g) => sum + g.completed, 0);

        const months = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const match = monthly.find((m) => m._id.y === d.getFullYear() && m._id.m === d.getMonth() + 1);
            months.push({ label: d.toLocaleString('en', { month: 'short' }), count: match?.count || 0 });
        }

        const activity = [
            ...recentEnquiries.map((e) => ({ type: 'enquiry', title: `New enquiry from ${e.fullName}`, detail: `${e.projectType} · ${e.status}`, at: e.createdAt })),
            ...recentProjects.map((p) => ({ type: 'project', title: `Project updated: ${p.name}`, detail: `${p.status} · ${p.progress}%`, at: p.updatedAt })),
            ...recentPosts.map((p) => ({ type: 'post', title: `Blog post updated: ${p.title}`, detail: p.status, at: p.updatedAt })),
        ].sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 8);

        res.json({
            enquiries: {
                total: enquiriesTotal,
                new: enquiriesNew,
                followUpsDue,
                byStatus: Object.fromEntries(enquiriesByStatus.map((s) => [s._id, s.count])),
            },
            projects: { active: projectsActive, completed: projectsCompleted, pipelineValue, completedValue },
            content: { portfolioPublished, postsPublished, postsDraft },
            monthlyEnquiries: months,
            upcomingDeadlines,
            activity,
        });
    } catch (error) {
        console.error(`[ADMIN stats] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

// ---- Trigger a frontend rebuild so crawlers get updated prerendered HTML ----
router.post('/rebuild', async (req, res) => {
    const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (!hook) {
        return res.status(501).json({ message: 'Rebuild is not configured. Set VERCEL_DEPLOY_HOOK_URL on the server.' });
    }
    try {
        const response = await fetch(hook, { method: 'POST' });
        if (!response.ok) throw new Error(`status ${response.status}`);
        res.status(202).json({ message: 'Rebuild started. The live site updates in a few minutes.' });
    } catch (error) {
        console.error(`[ADMIN rebuild] Error: ${error.message}`);
        res.status(502).json({ message: 'Could not start the rebuild.' });
    }
});

export default router;
