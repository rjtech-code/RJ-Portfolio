import Contact from './Contact.js';

// @desc    Store new contact inquiry
// @route   POST /api/contact
const createInquiry = async (req, res) => {
    try {
        const { name, email, phone, projectType, details } = req.body;
        
        // Input Validation
        if (!name || !email || !phone || !projectType || !details) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const inquiry = await Contact.create({
            fullName: name,
            email,
            phone,
            projectType,
            projectDetails: details
        });

        res.status(201).json({ 
            message: 'Your inquiry has been submitted successfully. RJ TechForce will contact you soon.', 
            data: inquiry 
        });
    } catch (error) {
        console.error(`[POST /api/contact] Error: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc    Get all inquiries
// @route   GET /api/contact
const getInquiries = async (req, res) => {
    try {
        const inquiries = await Contact.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update inquiry status
// @route   PATCH /api/contact/:id
const updateInquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const inquiry = await Contact.findById(req.params.id);

        if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

        inquiry.status = status || inquiry.status;
        const updatedInquiry = await inquiry.save();
        res.json(updatedInquiry);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete inquiry
// @route   DELETE /api/contact/:id
const deleteInquiry = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Inquiry removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry };
