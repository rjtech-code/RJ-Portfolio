import mongoose from 'mongoose';
import Contact, { PROJECT_TYPES, INQUIRY_STATUSES } from './Contact.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s\-().]{7,20}$/;

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

// Returns trimmed string fields or an error message
const validateInquiry = (body) => {
    if (!isPlainObject(body)) return { error: 'Invalid request body.' };

    const fields = {};
    for (const key of ['name', 'email', 'phone', 'projectType', 'details']) {
        if (typeof body[key] !== 'string' || !body[key].trim()) {
            return { error: 'All fields are required' };
        }
        fields[key] = body[key].trim();
    }

    if (fields.name.length > 100) return { error: 'Name is too long.' };
    if (fields.email.length > 254 || !EMAIL_PATTERN.test(fields.email)) return { error: 'Please enter a valid email address.' };
    if (!PHONE_PATTERN.test(fields.phone)) return { error: 'Please enter a valid phone number.' };
    if (!PROJECT_TYPES.includes(fields.projectType)) return { error: 'Please choose a valid project type.' };
    if (fields.details.length > 5000) return { error: 'Project details are too long (max 5000 characters).' };

    return { fields };
};

// @desc    Store new contact inquiry
// @route   POST /api/contact
const createInquiry = async (req, res) => {
    try {
        const { error, fields } = validateInquiry(req.body);
        if (error) return res.status(400).json({ message: error });

        await Contact.create({
            fullName: fields.name,
            email: fields.email,
            phone: fields.phone,
            projectType: fields.projectType,
            projectDetails: fields.details
        });

        res.status(201).json({
            message: 'Your inquiry has been submitted successfully. RJ TechForce will contact you soon.'
        });
    } catch (error) {
        // Log only the error type: messages can contain submitted personal data
        console.error(`[POST /api/contact] Error: ${error.name}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc    Get all inquiries
// @route   GET /api/contact
const getInquiries = async (req, res) => {
    try {
        const inquiries = await Contact.find().sort({ createdAt: -1 }).select('-__v');
        res.json(inquiries);
    } catch (error) {
        console.error(`[GET /api/contact] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update inquiry status
// @route   PATCH /api/contact/:id
const updateInquiryStatus = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid inquiry id.' });
        }

        // Only "status" may be changed
        const body = req.body;
        if (!isPlainObject(body) || Object.keys(body).some((key) => key !== 'status')) {
            return res.status(400).json({ message: 'Only the status field can be updated.' });
        }
        if (!INQUIRY_STATUSES.includes(body.status)) {
            return res.status(400).json({ message: 'Invalid status value.' });
        }

        const inquiry = await Contact.findById(req.params.id);
        if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

        inquiry.status = body.status;
        const updatedInquiry = await inquiry.save();
        res.json(updatedInquiry);
    } catch (error) {
        console.error(`[PATCH /api/contact] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete inquiry
// @route   DELETE /api/contact/:id
const deleteInquiry = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid inquiry id.' });
        }

        const deleted = await Contact.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Inquiry not found' });

        res.json({ message: 'Inquiry removed' });
    } catch (error) {
        console.error(`[DELETE /api/contact] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

export { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry };
