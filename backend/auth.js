import crypto from 'crypto';

const TOKEN_TTL_SECONDS = 8 * 60 * 60; // 8 hours
const MIN_SECRET_LENGTH = 32;

const getSecret = () => {
    const secret = process.env.ADMIN_TOKEN_SECRET || '';
    return secret.length >= MIN_SECRET_LENGTH ? secret : null;
};

export const isAuthConfigured = () =>
    Boolean(getSecret() && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);

// Constant-time comparison that also hides length differences
export const safeEqual = (a, b) => {
    const hashA = crypto.createHash('sha256').update(String(a)).digest();
    const hashB = crypto.createHash('sha256').update(String(b)).digest();
    return crypto.timingSafeEqual(hashA, hashB);
};

const sign = (payload, secret) =>
    crypto.createHmac('sha256', secret).update(payload).digest('base64url');

// Token format: base64url(JSON payload) + "." + HMAC-SHA256 signature
export const createAdminToken = (email) => {
    const now = Math.floor(Date.now() / 1000);
    const payload = Buffer.from(
        JSON.stringify({ sub: email, role: 'admin', iat: now, exp: now + TOKEN_TTL_SECONDS })
    ).toString('base64url');
    return `${payload}.${sign(payload, getSecret())}`;
};

export const verifyAdminToken = (token) => {
    const secret = getSecret();
    if (!secret || typeof token !== 'string') return null;

    const [payload, signature, extra] = token.split('.');
    if (!payload || !signature || extra !== undefined) return null;
    if (!safeEqual(signature, sign(payload, secret))) return null;

    try {
        const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (claims.role !== 'admin' || typeof claims.exp !== 'number') return null;
        if (claims.exp <= Math.floor(Date.now() / 1000)) return null;
        return claims;
    } catch {
        return null;
    }
};

export const requireAdmin = (req, res, next) => {
    if (!isAuthConfigured()) {
        return res.status(503).json({ message: 'Admin authentication is not configured.' });
    }

    const header = req.get('Authorization') || '';
    const match = header.match(/^Bearer\s+(\S+)$/i);
    const claims = match ? verifyAdminToken(match[1]) : null;

    if (!claims) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    req.admin = claims;
    next();
};
