import express from 'express';
import mongoose from 'mongoose';
import { sanitize, slugify } from './validate.js';

// Generic admin CRUD router. Mount behind requireAdmin.
// options:
//   spec       field whitelist for create/update (see validate.js)
//   sort       default sort for the list endpoint
//   slugField  source field for an auto-generated unique "slug"
//   check      (data, existing) => error message | null (cross-field rules)
export const crudRouter = (Model, { spec, sort = { createdAt: -1 }, slugField, check }) => {
    const router = express.Router();

    const uniqueSlug = async (base, excludeId) => {
        const root = slugify(base);
        let candidate = root;
        for (let i = 2; await Model.exists({ slug: candidate, _id: { $ne: excludeId } }); i++) {
            candidate = `${root}-${i}`;
        }
        return candidate;
    };

    const prepare = async (data, existing) => {
        if (slugField) {
            if (data.slug === '' || (!existing && !data.slug)) {
                data.slug = await uniqueSlug(data[slugField] ?? existing?.[slugField], existing?._id);
            } else if (data.slug) {
                data.slug = await uniqueSlug(data.slug, existing?._id);
            }
        }
        // First publish sets the publish date
        if ('status' in Model.schema.paths && data.status === 'published' && !existing?.publishedAt && 'publishedAt' in Model.schema.paths) {
            data.publishedAt = new Date();
        }
        return check ? check({ ...(existing?.toObject?.() || {}), ...data }) : null;
    };

    const validId = (req, res, next) => {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid id.' });
        next();
    };

    const handleError = (res, error) => {
        if (error.code === 11000) return res.status(409).json({ message: 'An item with the same unique value already exists.' });
        if (error.name === 'ValidationError') return res.status(400).json({ message: 'Invalid data.' });
        console.error(`[ADMIN ${Model.modelName}] Error: ${error.name}`);
        return res.status(500).json({ message: 'Server Error' });
    };

    router.get('/', async (req, res) => {
        try {
            res.json(await Model.find().sort(sort).select('-__v').lean());
        } catch (error) {
            handleError(res, error);
        }
    });

    router.get('/:id', validId, async (req, res) => {
        try {
            const item = await Model.findById(req.params.id).select('-__v').lean();
            if (!item) return res.status(404).json({ message: 'Not found' });
            res.json(item);
        } catch (error) {
            handleError(res, error);
        }
    });

    router.post('/', async (req, res) => {
        try {
            const { data, error } = sanitize(req.body, spec);
            if (error) return res.status(400).json({ message: error });
            const ruleError = await prepare(data, null);
            if (ruleError) return res.status(400).json({ message: ruleError });
            const created = await Model.create(data);
            res.status(201).json(created.toObject({ versionKey: false }));
        } catch (error) {
            handleError(res, error);
        }
    });

    router.patch('/:id', validId, async (req, res) => {
        try {
            const { data, error } = sanitize(req.body, spec, { partial: true });
            if (error) return res.status(400).json({ message: error });
            const item = await Model.findById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Not found' });
            const ruleError = await prepare(data, item);
            if (ruleError) return res.status(400).json({ message: ruleError });
            item.set(data);
            const saved = await item.save();
            res.json(saved.toObject({ versionKey: false }));
        } catch (error) {
            handleError(res, error);
        }
    });

    router.delete('/:id', validId, async (req, res) => {
        try {
            const deleted = await Model.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Deleted' });
        } catch (error) {
            handleError(res, error);
        }
    });

    return router;
};
