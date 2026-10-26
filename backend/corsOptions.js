// Origins allowed during local development when FRONTEND_URL is not set
const DEV_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:4173',
    'http://127.0.0.1:4173',
];

// Parse a comma-separated list of origins, keeping only valid http(s) origins
export const parseAllowedOrigins = (value = '') => {
    const origins = new Set();

    for (const raw of value.split(',')) {
        const candidate = raw.trim();
        if (!candidate) continue;

        try {
            const url = new URL(candidate);
            if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('protocol');
            origins.add(url.origin);
        } catch {
            console.warn(`[CORS] Ignoring invalid origin in FRONTEND_URL: "${candidate}"`);
        }
    }

    return origins;
};

// Exact-match allow-list. Never reflects arbitrary origins and never falls back to "*".
// Production without FRONTEND_URL: no cross-origin browser access (fails closed).
export const buildCorsOptions = (env = process.env) => {
    const isProduction = env.NODE_ENV === 'production';
    let allowed = parseAllowedOrigins(env.FRONTEND_URL);

    if (allowed.size === 0) {
        if (isProduction) {
            console.error('[CORS] FRONTEND_URL is not set: cross-origin requests from browsers will be rejected.');
        } else {
            allowed = new Set(DEV_ORIGINS);
            console.warn('[CORS] FRONTEND_URL is not set: allowing local development origins only.');
        }
    }

    return {
        allowedOrigins: allowed,
        options: {
            origin: (origin, callback) => callback(null, Boolean(origin) && allowed.has(origin)),
            methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            maxAge: 600,
        },
    };
};
