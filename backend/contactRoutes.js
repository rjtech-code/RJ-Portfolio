import express from 'express';
import { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry } from './contactController.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Create a new contact inquiry
router.post('/', createInquiry);

// @route   GET /api/contact
// @desc    Get all contact inquiries
router.get('/', getInquiries);

// @route   PATCH /api/contact/:id
// @desc    Update inquiry status
router.patch('/:id', updateInquiryStatus);

// @route   DELETE /api/contact/:id
// @desc    Delete an inquiry
router.delete('/:id', deleteInquiry);

export default router;
