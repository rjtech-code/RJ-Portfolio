import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import contactRoutes from './contactRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors()); // Enable cross-origin for Frontend
app.use(express.json());

// API Routes
app.use('/api/contact', contactRoutes);

app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        res.json({ token: 'auth_token_2026_rj', email });
    } else {
        res.status(401).json({ message: 'Invalid administrator credentials.' });
    }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong on the server!',
        error: process.env.NODE_ENV === 'production' ? {} : err.message 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[SERVER] Running on port ${PORT}`));
