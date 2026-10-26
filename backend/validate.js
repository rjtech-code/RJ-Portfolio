// Small whitelist-based validator for admin write endpoints.
// Each spec entry: { type, required, max, min, enum, pattern, maxItems }
// Types: string | text | number | boolean | date | stringArray | objectId
import mongoose from 'mongoose';

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const castField = (key, value, rule) => {
    if (value === null || value === undefined || value === '') {
        if (rule.required) return { error: `${rule.label || key} is required.` };
        if (rule.type === 'stringArray') return { value: [] };
        if (rule.type === 'boolean') return { value: false };
        if (rule.type === 'string' || rule.type === 'text') return { value: '' };
        return { value: null };
    }

    switch (rule.type) {
        case 'string':
        case 'text': {
            if (typeof value !== 'string') return { error: `${rule.label || key} must be text.` };
            const trimmed = value.trim();
            if (rule.required && !trimmed) return { error: `${rule.label || key} is required.` };
            const max = rule.max ?? (rule.type === 'text' ? 20000 : 300);
            if (trimmed.length > max) return { error: `${rule.label || key} must be at most ${max} characters.` };
            if (rule.enum && !rule.enum.includes(trimmed)) return { error: `${rule.label || key} has an invalid value.` };
            if (rule.pattern && trimmed && !rule.pattern.test(trimmed)) return { error: `${rule.label || key} has an invalid format.` };
            return { value: trimmed };
        }
        case 'number': {
            const num = typeof value === 'string' ? Number(value) : value;
            if (typeof num !== 'number' || !Number.isFinite(num)) return { error: `${rule.label || key} must be a number.` };
            if (rule.min !== undefined && num < rule.min) return { error: `${rule.label || key} must be at least ${rule.min}.` };
            if (rule.max !== undefined && num > rule.max) return { error: `${rule.label || key} must be at most ${rule.max}.` };
            return { value: num };
        }
        case 'boolean':
            if (typeof value !== 'boolean') return { error: `${rule.label || key} must be true or false.` };
            return { value };
        case 'date': {
            const date = new Date(value);
            if (typeof value !== 'string' || Number.isNaN(date.getTime())) return { error: `${rule.label || key} must be a valid date.` };
            return { value: date };
        }
        case 'stringArray': {
            if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
                return { error: `${rule.label || key} must be a list of text values.` };
            }
            const items = value.map((item) => item.trim()).filter(Boolean);
            if (items.length > (rule.maxItems ?? 30)) return { error: `${rule.label || key} has too many items.` };
            if (items.some((item) => item.length > (rule.max ?? 200))) return { error: `${rule.label || key} contains an item that is too long.` };
            return { value: items };
        }
        case 'objectId':
            if (typeof value !== 'string' || !mongoose.isValidObjectId(value)) return { error: `${rule.label || key} is invalid.` };
            return { value };
        default:
            return { error: `Unsupported field ${key}.` };
    }
};

// partial = true for PATCH: only the provided fields are validated and returned
export const sanitize = (body, spec, { partial = false } = {}) => {
    if (!isPlainObject(body)) return { error: 'Invalid request body.' };

    const unknown = Object.keys(body).filter((key) => !(key in spec));
    if (unknown.length) return { error: `Unknown field: ${unknown[0]}.` };

    const data = {};
    for (const [key, rule] of Object.entries(spec)) {
        if (!(key in body)) {
            if (!partial && rule.required) return { error: `${rule.label || key} is required.` };
            continue;
        }
        const { value, error } = castField(key, body[key], rule);
        if (error) return { error };
        data[key] = value;
    }
    return { data };
};

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const URL_PATTERN = /^(https:\/\/|\/)[^\s<>"']*$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const slugify = (text) =>
    String(text)
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80) || 'item';
