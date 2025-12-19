// Backend API nâng cấp để xử lý donation và gửi email tự động
// Hỗ trợ Buy Me a Coffee và các payment gateway Việt Nam

import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getThankYouEmailTemplate, getPendingDonationTemplate } from './email-templates.js';
import {
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
} from './webhook-validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình email transporter
let transporter = null;

function createEmailTransporter() {
  // Kiểm tra xem có cấu hình email không
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ Email not configured. Set EMAIL_USER and EMAIL_PASS in .env file');
    return null;
  }

  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

// Database đơn giản sử dụng JSON file
const DB_PATH = path.join(__dirname, '../data/donations.json');

async function initDatabase() {
  try {
    const dataDir = path.join(__dirname, '../data');
    await fs.mkdir(dataDir, { recursive: true });

    try {
      await fs.access(DB_PATH);
    } catch {
      // File doesn't exist, create it
      await fs.writeFile(DB_PATH, JSON.stringify({ donations: [] }, null, 2));
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

async function saveDonation(donation) {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const db = JSON.parse(data);

    db.donations.push({
      ...donation,
      createdAt: new Date().toISOString()
    });

    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
    console.log('✅ Donation saved:', donation.donationCode);
  } catch (error) {
    console.error('Error saving donation:', error);
  }
}

async function findDonationByCode(code) {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const db = JSON.parse(data);
    return db.donations.find(d => d.donationCode === code);
  } catch (error) {
    console.error('Error finding donation:', error);
    return null;
  }
}

async function updateDonationStatus(code, updates) {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const db = JSON.parse(data);

    const index = db.donations.findIndex(d => d.donationCode === code);
    if (index !== -1) {
      db.donations[index] = {
        ...db.donations[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
      console.log('✅ Donation updated:', code);
      return db.donations[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating donation:', error);
    return null;
  }
}

// Gửi email với error handling
async function sendEmail(to, subject, html) {
  // Check if email is configured
  if (!transporter) {
    transporter = createEmailTransporter();
  }

  if (!transporter) {
    console.log('📧 EMAIL PREVIEW (not sent - email not configured)');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('---');
    return { success: false, reason: 'Email not configured' };
  }

  // Rate limiting
  if (!emailRateLimiter.check(to)) {
    console.warn('⚠️ Rate limit exceeded for:', to);
    return { success: false, reason: 'Rate limit exceeded' };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Nuôi Tôi" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log('✅ Email sent successfully to:', to);
    console.log('Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return { success: false, error: error.message };
  }
}

// Main API handler
export default async function handler(req, res) {
  // Initialize database
  await initDatabase();

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Endpoint: Đăng ký email donation (được gọi từ frontend)
  if (req.method === 'POST' && req.url === '/api/donation/register') {
    try {
      const { email, name, language } = req.body;

      // Validate input
      if (!email || !isValidEmail(sanitizeInput(email))) {
        return res.status(400).json({
          success: false,
          error: 'Invalid email address'
        });
      }

      // Generate unique donation code
      const donationCode = generateDonationCode();

      // Save to database
      await saveDonation({
        email: sanitizeInput(email),
        name: sanitizeInput(name) || '',
        donationCode,
        language: language || 'vi',
        status: 'pending'
      });

      // Send pending confirmation email
      const emailTemplate = getPendingDonationTemplate({
        name: sanitizeInput(name),
        donationCode,
        language: language || 'vi'
      });

      await sendEmail(email, emailTemplate.subject, emailTemplate.html);

      return res.status(200).json({
        success: true,
        donationCode,
        message: 'Donation registered successfully'
      });

    } catch (error) {
      console.error('Error in /api/donation/register:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // 2. Webhook: Buy Me a Coffee
  if (req.method === 'POST' && req.url === '/api/webhook/buymeacoffee') {
    try {
      // Validate webhook
      if (!validateBMCWebhook(req, process.env.BMC_WEBHOOK_SECRET)) {
        console.warn('⚠️ Invalid BMC webhook signature');
        // Still process in development mode
        if (process.env.NODE_ENV === 'production') {
          return res.status(403).json({ error: 'Invalid signature' });
        }
      }

      const { data } = req.body;
      const {
        supporter_name,
        supporter_email,
        support_coffee_price,
        support_message,
        support_created_on
      } = data || {};

      // Extract donation code from message
      const donationCode = extractDonationCode(support_message);

      if (donationCode) {
        // Find existing donation registration
        const donation = await findDonationByCode(donationCode);

        if (donation && donation.status === 'pending') {
          // Update donation status
          await updateDonationStatus(donationCode, {
            status: 'completed',
            amount: support_coffee_price,
            paymentMethod: 'Buy Me a Coffee',
            supporterName: supporter_name,
            completedAt: support_created_on
          });

          // Send thank you email
          const emailTemplate = getThankYouEmailTemplate({
            name: supporter_name || donation.name,
            email: donation.email,
            amount: support_coffee_price,
            donationCode,
            message: support_message,
            language: donation.language
          });

          await sendEmail(
            donation.email,
            emailTemplate.subject,
            emailTemplate.html
          );

          console.log('✅ BMC donation processed:', donationCode);
        }
      }

      // Also send to supporter's email if provided
      if (supporter_email && isValidEmail(supporter_email)) {
        const emailTemplate = getThankYouEmailTemplate({
          name: supporter_name,
          email: supporter_email,
          amount: support_coffee_price,
          message: support_message,
          language: 'vi'
        });

        await sendEmail(
          supporter_email,
          emailTemplate.subject,
          emailTemplate.html
        );
      }

      return res.status(200).json({ success: true });

    } catch (error) {
      console.error('Error in /api/webhook/buymeacoffee:', error);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  // 3. Webhook: VNPay
  if (req.method === 'POST' && req.url === '/api/webhook/vnpay') {
    try {
      if (!validateVNPayWebhook(req.body, process.env.VNPAY_SECRET_KEY)) {
        return res.status(403).json({ error: 'Invalid signature' });
      }

      const {
        vnp_Amount,
        vnp_OrderInfo,
        vnp_TxnRef,
        vnp_ResponseCode
      } = req.body;

      if (vnp_ResponseCode === '00') { // Success
        const donationCode = extractDonationCode(vnp_OrderInfo);

        if (donationCode) {
          const donation = await findDonationByCode(donationCode);

          if (donation) {
            await updateDonationStatus(donationCode, {
              status: 'completed',
              amount: parseInt(vnp_Amount) / 100, // VNPay amount is in cents
              paymentMethod: 'VNPay',
              transactionId: vnp_TxnRef
            });

            const emailTemplate = getThankYouEmailTemplate({
              name: donation.name,
              email: donation.email,
              amount: parseInt(vnp_Amount) / 100,
              donationCode,
              transactionId: vnp_TxnRef,
              language: donation.language
            });

            await sendEmail(
              donation.email,
              emailTemplate.subject,
              emailTemplate.html
            );
          }
        }
      }

      return res.status(200).json({ RspCode: '00', Message: 'success' });

    } catch (error) {
      console.error('Error in /api/webhook/vnpay:', error);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  // 4. Webhook: MoMo
  if (req.method === 'POST' && req.url === '/api/webhook/momo') {
    try {
      if (!validateMoMoWebhook(req, process.env.MOMO_SECRET_KEY)) {
        return res.status(403).json({ error: 'Invalid signature' });
      }

      const { resultCode, amount, orderInfo, transId } = req.body;

      if (resultCode === 0) { // Success
        const donationCode = extractDonationCode(orderInfo);

        if (donationCode) {
          const donation = await findDonationByCode(donationCode);

          if (donation) {
            await updateDonationStatus(donationCode, {
              status: 'completed',
              amount,
              paymentMethod: 'MoMo',
              transactionId: transId
            });

            const emailTemplate = getThankYouEmailTemplate({
              name: donation.name,
              email: donation.email,
              amount,
              donationCode,
              transactionId: transId,
              language: donation.language
            });

            await sendEmail(
              donation.email,
              emailTemplate.subject,
              emailTemplate.html
            );
          }
        }
      }

      return res.status(200).json({ message: 'success' });

    } catch (error) {
      console.error('Error in /api/webhook/momo:', error);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  // 5. Test endpoint (chỉ dùng cho development)
  if (req.method === 'POST' && req.url === '/api/test/email') {
    if (process.env.NODE_ENV === 'production') {
      return res.status(404).json({ error: 'Not found' });
    }

    const { email } = req.body;

    const emailTemplate = getThankYouEmailTemplate({
      name: 'Test User',
      email,
      amount: 50000,
      donationCode: 'TEST_123456',
      message: 'This is a test donation',
      language: 'vi'
    });

    const result = await sendEmail(email, emailTemplate.subject, emailTemplate.html);

    return res.status(200).json({ success: result.success });
  }

  // 6. Get donation history (cho admin hoặc user tracking)
  if (req.method === 'GET' && req.url.startsWith('/api/donations')) {
    try {
      const data = await fs.readFile(DB_PATH, 'utf-8');
      const db = JSON.parse(data);

      // Filter out sensitive info
      const publicDonations = db.donations.map(d => ({
        donationCode: d.donationCode,
        amount: d.amount,
        status: d.status,
        createdAt: d.createdAt,
        completedAt: d.completedAt
      }));

      return res.status(200).json({
        success: true,
        donations: publicDonations
      });

    } catch (error) {
      console.error('Error fetching donations:', error);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  // Default response
  return res.status(404).json({ error: 'Endpoint not found' });
}