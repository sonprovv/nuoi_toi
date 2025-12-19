// Webhook validators cho các payment gateway
import crypto from 'crypto';

/**
 * Validate Buy Me a Coffee webhook signature
 * @param {Object} req - Request object
 * @param {string} secret - Webhook secret từ BMC dashboard
 */
export function validateBMCWebhook(req, secret) {
    if (!secret) {
        console.warn('BMC webhook secret not configured, skipping validation');
        return true; // Allow in development mode
    }

    const signature = req.headers['x-bmac-signature'];
    if (!signature) {
        return false;
    }

    const payload = JSON.stringify(req.body);
    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

    return signature === expectedSignature;
}

/**
 * Validate VNPay IPN (Instant Payment Notification)
 * Documentation: https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/
 */
export function validateVNPayWebhook(params, secretKey) {
    if (!secretKey) {
        console.warn('VNPay secret key not configured');
        return false;
    }

    const vnp_SecureHash = params.vnp_SecureHash;
    delete params.vnp_SecureHash;
    delete params.vnp_SecureHashType;

    // Sort parameters
    const sortedParams = Object.keys(params).sort();
    const signData = sortedParams
        .map(key => `${key}=${params[key]}`)
        .join('&');

    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    return vnp_SecureHash === signed;
}

/**
 * Validate MoMo webhook
 * Documentation: https://developers.momo.vn/
 */
export function validateMoMoWebhook(req, secretKey) {
    if (!secretKey) {
        console.warn('MoMo secret key not configured');
        return false;
    }

    const {
        partnerCode,
        orderId,
        requestId,
        amount,
        orderInfo,
        orderType,
        transId,
        resultCode,
        message,
        payType,
        responseTime,
        extraData,
        signature
    } = req.body;

    const rawSignature = `accessKey=${process.env.MOMO_ACCESS_KEY}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;

    const expectedSignature = crypto
        .createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    return signature === expectedSignature;
}

/**
 * Validate ZaloPay callback
 */
export function validateZaloPayWebhook(req, key2) {
    if (!key2) {
        console.warn('ZaloPay key2 not configured');
        return false;
    }

    const { data, mac } = req.body;
    const expectedMac = crypto
        .createHmac('sha256', key2)
        .update(data)
        .digest('hex');

    return mac === expectedMac;
}

/**
 * Rate limiting middleware to prevent spam
 */
class RateLimiter {
    constructor(maxRequests = 10, windowMs = 60000) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.requests = new Map();
    }

    check(identifier) {
        const now = Date.now();
        const userRequests = this.requests.get(identifier) || [];

        // Remove old requests outside the window
        const validRequests = userRequests.filter(
            timestamp => now - timestamp < this.windowMs
        );

        if (validRequests.length >= this.maxRequests) {
            return false; // Rate limit exceeded
        }

        validRequests.push(now);
        this.requests.set(identifier, validRequests);

        return true; // Allow request
    }

    reset(identifier) {
        this.requests.delete(identifier);
    }
}

export const emailRateLimiter = new RateLimiter(3, 60000); // Max 3 emails per minute per email address

/**
 * Sanitize input để prevent XSS và injection
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return input;
    }

    return input
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .trim()
        .substring(0, 1000); // Limit length
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Extract donation code from transaction content
 */
export function extractDonationCode(content) {
    if (!content) return null;

    const patterns = [
        /DONATE[_\s-]?(\d+)/i,          // DONATE_123456 or DONATE123456
        /NUOITOI[_\s-]?(\d+)/i,         // NUOITOI_123456
        /NG[_\s-]?(\d+)/i,              // NG_123456 (short for Nuôi)
        /\b(\d{13,})\b/                  // Any 13+ digit number
    ];

    for (const pattern of patterns) {
        const match = content.match(pattern);
        if (match) {
            return match[0]; // Return full matched code
        }
    }

    return null;
}

/**
 * Validate donation amount (should be positive and reasonable)
 */
export function isValidDonationAmount(amount) {
    const numAmount = parseFloat(amount);
    return !isNaN(numAmount) && numAmount > 0 && numAmount < 1000000000; // Max 1 billion VND
}

/**
 * Generate secure donation code
 */
export function generateDonationCode() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `DONATE_${timestamp}${random}`;
}

export default {
    validateBMCWebhook,
    validateVNPayWebhook,
    validateMoMoWebhook,
    validateZaloPayWebhook,
    emailRateLimiter,
    sanitizeInput,
    isValidEmail,
    extractDonationCode,
    isValidDonationAmount,
    generateDonationCode
};
