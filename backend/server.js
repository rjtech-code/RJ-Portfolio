import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import contactRoutes from './contactRoutes.js';
import { createAdminToken, isAuthConfigured, safeEqual } from './auth.js';
import rateLimit from './rateLimit.js';
import adminRoutes from './adminRoutes.js';
import publicRoutes from './publicRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.disable('x-powered-by');

// Behind a single reverse proxy (e.g. Render), so req.ip reflects the real client
app.set('trust proxy', 1);

// API responses should never appear in search results
app.use((req, res, next) => {
    res.set('X-Robots-Tag', 'noindex, nofollow');
    res.set('X-Content-Type-Options', 'nosniff');
    next();
});

// Read allowed frontend origins directly from the backend environment.
// Supports one URL or a comma-separated list, e.g.
// FRONTEND_URL=https://dev.vultusgo.in,https://your-production-domain.com
const allowedFrontendOrigins = new Set(
    (process.env.FRONTEND_URL || '')
        .split(',')
        .map((value) => {
            const candidate = value.trim();
            if (!candidate) return null;

            try {
                const url = new URL(candidate);
                if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
                return url.origin;
            } catch {
                console.warn('[CORS] Ignoring invalid FRONTEND_URL entry.');
                return null;
            }
        })
        .filter(Boolean)
);

// Local development origins are allowed only outside production when FRONTEND_URL is empty.
if (allowedFrontendOrigins.size === 0 && process.env.NODE_ENV !== 'production') {
    [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:4173',
        'http://127.0.0.1:4173',
    ].forEach((origin) => allowedFrontendOrigins.add(origin));
}

if (allowedFrontendOrigins.size === 0 && process.env.NODE_ENV === 'production') {
    console.error('[CORS] FRONTEND_URL is missing or invalid; browser cross-origin requests will be rejected.');
}

const corsOptions = {
    origin(origin, callback) {
        // Allow server-to-server / health-check requests that do not send an Origin header.
        if (!origin) return callback(null, true);

        // Exact origin match; never allow arbitrary origins or wildcard access.
        return callback(null, allowedFrontendOrigins.has(origin));
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
};

app.use(cors(corsOptions));

// Lightweight health checks for hosting-platform monitoring.
// Liveness confirms the Node process can answer HTTP; readiness also requires MongoDB.
app.get('/healthz', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/readyz', (req, res) => {
    const databaseReady = mongoose.connection.readyState === 1;
    res.status(databaseReady ? 200 : 503).json({
        status: databaseReady ? 'ready' : 'not_ready',
        database: databaseReady ? 'connected' : 'disconnected',
    });
});

// Admin content (blog posts) can be larger; public endpoints keep a small limit
app.use('/api/admin', express.json({ limit: '200kb' }));
app.use(express.json({ limit: '20kb' }));

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/public', publicRoutes);

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many login attempts. Please try again later.',
});

app.post('/api/admin/login', loginLimiter, (req, res) => {
    if (!isAuthConfigured()) {
        return res.status(503).json({ message: 'Admin authentication is not configured.' });
    }

    const { email, password } = req.body || {};
    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const emailMatches = safeEqual(email.trim().toLowerCase(), process.env.ADMIN_EMAIL.trim().toLowerCase());
    const passwordMatches = safeEqual(password, process.env.ADMIN_PASSWORD);

    if (emailMatches && passwordMatches) {
        res.json({ token: createAdminToken(process.env.ADMIN_EMAIL), email: process.env.ADMIN_EMAIL });
    } else {
        res.status(401).json({ message: 'Invalid administrator credentials.' });
    }
});

// Protected admin API (every route requires a valid admin token)
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

// Global Error Handling Middleware (Express needs all four arguments to treat it as an error handler)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    // Malformed or oversized JSON bodies
    if (err.type === 'entity.parse.failed' || err.type === 'entity.too.large') {
        return res.status(err.status || 400).json({ message: 'Invalid request body.' });
    }

    console.error(`[ERROR] ${req.method} ${req.path}: ${err.name}`);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

// PORT must be a number; hosts such as Render inject it automatically
const PORT = Number.parseInt(process.env.PORT, 10) || 5000;
if (process.env.PORT && String(PORT) !== process.env.PORT.trim()) {
    console.warn('[SERVER] PORT is not a valid number; falling back to 5000.');
}
app.listen(PORT, () => console.log(`[SERVER] Running on port ${PORT}`));
