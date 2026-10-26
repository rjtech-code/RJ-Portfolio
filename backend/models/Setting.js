import mongoose from 'mongoose';

// Owner-confirmed defaults (Oct 2026). Editable in Admin > Settings.
export const DEFAULT_SETTINGS = {
    companyName: 'RJ TechForce',
    tagline: 'Build · Design · Grow',
    email: 'rjtechforce@gmail.com',
    phone: '+91 96643 73310',
    whatsapp: '919664373310',
    locality: 'Churu',
    region: 'Rajasthan',
    country: 'India',
    hours: 'Available 24/7',
    socialLinks: [{ name: 'Instagram', url: 'https://www.instagram.com/rjtechforce/' }],
};

const settingSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true, default: 'site' },
    companyName: String,
    tagline: String,
    email: String,
    phone: String,
    whatsapp: String,
    locality: String,
    region: String,
    country: String,
    hours: String,
    socialLinks: { type: [{ name: String, url: String, _id: false }], default: [] },
}, { timestamps: true });

const Setting = mongoose.model('Setting', settingSchema);

export const getSiteSettings = async () => {
    const doc = await Setting.findOne({ key: 'site' }).lean();
    const settings = { ...DEFAULT_SETTINGS };
    if (!doc) return settings;
    for (const field of Object.keys(DEFAULT_SETTINGS)) {
        if (doc[field] !== undefined && doc[field] !== null) settings[field] = doc[field];
    }
    settings.updatedAt = doc.updatedAt;
    return settings;
};

export default Setting;
