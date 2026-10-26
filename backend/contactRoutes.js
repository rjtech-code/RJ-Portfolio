import express from 'express';
import { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry } from './contactController.js';
import { requireAdmin } from './auth.js';
import rateLimit from './rateLimit.js';

const router = express.Router();

const submitLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: 'Too many submissions. Please try again later.',
});

// @route   POST /api/contact
// @desc    Create a new contact inquiry (public)
router.post('/', submitLimiter, createInquiry);

// @route   GET /api/contact
// @desc    Get all contact inquiries (admin only)
router.get('/', requireAdmin, getInquiries);

// @route   PATCH /api/contact/:id
// @desc    Update inquiry status (admin only)
router.patch('/:id', requireAdmin, updateInquiryStatus);

// @route   DELETE /api/contact/:id
// @desc    Delete an inquiry (admin only)
router.delete('/:id', requireAdmin, deleteInquiry);

export default router;
