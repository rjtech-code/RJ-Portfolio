import mongoose from 'mongoose';
import Contact, { PROJECT_TYPES, INQUIRY_TYPES, INQUIRY_STATUSES } from './Contact.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s\-().]{7,20}$/;
const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const optionalText = (value, max, label) => {
    if (value === undefined || value === null || value === '') return { value: '' };
    if (typeof value !== 'string') return { error: `${label} must be text.` };
    const clean = value.trim();
    if (clean.length > max) return { error: `${label} is too long (max ${max} characters).` };
    return { value: clean };
};

const validateInquiry = (body, origin) => {
    if (!isPlainObject(body)) return { error: 'Invalid request body.' };
    if (typeof body.name !== 'string' || !body.name.trim()) return { error: 'Name is required.' };
    if (typeof body.email !== 'string' || !body.email.trim()) return { error: 'Email is required.' };

    const fields = {
        name: body.name.trim(),
        email: body.email.trim(),
        phone: typeof body.phone === 'string' ? body.phone.trim() : '',
        projectType: typeof body.projectType === 'string' && body.projectType.trim() ? body.projectType.trim() : 'Other',
        details: typeof body.details === 'string' ? body.details.trim() : (typeof body.message === 'string' ? body.message.trim() : ''),
        inquiryType: typeof body.inquiryType === 'string' ? body.inquiryType.trim() : 'project_contact',
        sourceDomain: typeof body.sourceDomain === 'string' ? body.sourceDomain.trim() : '',
    };

    if (fields.name.length > 100) return { error: 'Name is too long.' };
    if (fields.email.length > 254 || !EMAIL_PATTERN.test(fields.email)) return { error: 'Please enter a valid email address.' };
    if (fields.phone && !PHONE_PATTERN.test(fields.phone)) return { error: 'Please enter a valid phone number.' };
    if (!PROJECT_TYPES.includes(fields.projectType)) return { error: 'Please choose a valid project type.' };
    if (!fields.details) return { error: 'Message or project details are required.' };
    if (fields.details.length > 5000) return { error: 'Project details are too long (max 5000 characters).' };
    if (!INQUIRY_TYPES.includes(fields.inquiryType)) return { error: 'Please choose a valid inquiry type.' };

    const organization = optionalText(body.organization, 200, 'School / organization');
    const productName = optionalText(body.productName, 200, 'Product');
    const location = optionalText(body.location, 200, 'Location');
    if (organization.error || productName.error || location.error) {
        return { error: organization.error || productName.error || location.error };
    }

    let sourceDomain = fields.sourceDomain;
    if (!sourceDomain && origin) {
        try { sourceDomain = new URL(origin).hostname; } catch { sourceDomain = ''; }
    }
    if (!sourceDomain) sourceDomain = 'unknown';
    if (sourceDomain.length > 255) return { error: 'Source domain is invalid.' };

    let studentCount = null;
    if (body.studentCount !== undefined && body.studentCount !== null && body.studentCount !== '') {
        studentCount = Number(body.studentCount);
        if (!Number.isInteger(studentCount) || studentCount < 0 || studentCount > 10000000) {
            return { error: 'Student count must be a valid non-negative whole number.' };
        }
    }

    return { fields: { ...fields, ...{
        organization: organization.value,
        productName: productName.value,
        location: location.value,
        studentCount,
        sourceDomain: sourceDomain.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, ''),
    } } };
};

// Public submission endpoint: stores inquiries from all approved Vultus Go properties.
const createInquiry = async (req, res) => {
    try {
        const { error, fields } = validateInquiry(req.body, req.get('origin'));
        if (error) return res.status(400).json({ message: error });

        await Contact.create({
            fullName: fields.name,
            email: fields.email,
            phone: fields.phone,
            projectType: fields.projectType,
            projectDetails: fields.details,
            organization: fields.organization,
            productName: fields.productName,
            studentCount: fields.studentCount,
            location: fields.location,
            inquiryType: fields.inquiryType,
            sourceDomain: fields.sourceDomain,
        });

        res.status(201).json({ message: 'Your inquiry has been submitted successfully. Vultus Go will contact you soon.' });
    } catch (error) {
        console.error(`[POST /api/contact] Error: ${error.name}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getInquiries = async (req, res) => {
    try {
        const inquiries = await Contact.find().sort({ createdAt: -1 }).select('-__v');
        res.json(inquiries);
    } catch (error) {
        console.error(`[GET /api/contact] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateInquiryStatus = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid inquiry id.' });
        const body = req.body;
        const allowed = ['status', 'notes', 'followUpDate'];
        if (!isPlainObject(body) || !Object.keys(body).length || Object.keys(body).some((key) => !allowed.includes(key))) {
            return res.status(400).json({ message: 'Only status, notes and follow-up date can be updated.' });
        }
        if ('status' in body && !INQUIRY_STATUSES.includes(body.status)) return res.status(400).json({ message: 'Invalid status value.' });
        if ('notes' in body && (typeof body.notes !== 'string' || body.notes.length > 5000)) return res.status(400).json({ message: 'Notes must be text (max 5000 characters).' });
        let followUpDate;
        if ('followUpDate' in body) {
            followUpDate = body.followUpDate === null || body.followUpDate === '' ? null : new Date(body.followUpDate);
            if (followUpDate && (typeof body.followUpDate !== 'string' || Number.isNaN(followUpDate.getTime()))) return res.status(400).json({ message: 'Invalid follow-up date.' });
        }

        const inquiry = await Contact.findById(req.params.id);
        if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
        if ('status' in body) inquiry.status = body.status;
        if ('notes' in body) inquiry.notes = body.notes;
        if (followUpDate !== undefined) inquiry.followUpDate = followUpDate;
        res.json(await inquiry.save());
    } catch (error) {
        console.error(`[PATCH /api/contact] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteInquiry = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid inquiry id.' });
        const deleted = await Contact.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Inquiry not found' });
        res.json({ message: 'Inquiry removed' });
    } catch (error) {
        console.error(`[DELETE /api/contact] Error: ${error.name}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

export { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry };
