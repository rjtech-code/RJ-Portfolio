import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import contactRoutes from './contactRoutes.js';
import { buildCorsOptions } from './corsOptions.js';
import { createAdminToken, isAuthConfigured, safeEqual } from './auth.js';
import rateLimit from './rateLimit.js';

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

// Restrict cross-origin requests to the exact origins listed in FRONTEND_URL
const { options: corsOptions } = buildCorsOptions();
app.use(cors(corsOptions));
app.use(express.json({ limit: '20kb' }));

// API Routes
app.use('/api/contact', contactRoutes);

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
