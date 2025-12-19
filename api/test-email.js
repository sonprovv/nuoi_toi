#!/usr/bin/env node

// Test script để gửi email thử nghiệm
// Usage: node api/test-email.js your-email@example.com

import { config } from 'dotenv';
import { getThankYouEmailTemplate } from './email-templates.js';
import nodemailer from 'nodemailer';

// Load environment variables
config();

const testEmail = process.argv[2];

if (!testEmail) {
    console.error('❌ Usage: node api/test-email.js your-email@example.com');
    process.exit(1);
}

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Email not configured!');
    console.error('');
    console.error('Please create .env file with:');
    console.error('EMAIL_USER=your-email@gmail.com');
    console.error('EMAIL_PASS=your-16-digit-app-password');
    console.error('');
    console.error('See EMAIL_SETUP_GUIDE.md for detailed instructions.');
    process.exit(1);
}

console.log('📧 Testing email configuration...\n');
console.log('From:', process.env.EMAIL_USER);
console.log('To:', testEmail);
console.log('');

const transporter = nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendTestEmail() {
    try {
        // Verify connection
        console.log('⏳ Verifying SMTP connection...');
        await transporter.verify();
        console.log('✅ SMTP connection successful!\n');

        // Generate test email
        const emailTemplate = getThankYouEmailTemplate({
            name: 'Test User',
            email: testEmail,
            amount: 50000,
            donationCode: 'TEST_' + Date.now(),
            transactionId: 'TXN_TEST_123456',
            message: 'This is a test donation to verify email system works!',
            language: 'vi'
        });

        console.log('📮 Sending test email...');
        const info = await transporter.sendMail({
            from: `"Nuôi Tôi (Test)" <${process.env.EMAIL_USER}>`,
            to: testEmail,
            subject: emailTemplate.subject + ' [TEST]',
            html: emailTemplate.html
        });

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('');
        console.log('✨ Please check your inbox (and spam folder)!');
        console.log('');
        console.log('If you received the email:');
        console.log('  ✅ Email configuration is correct!');
        console.log('  ✅ Ready for production use!');
        console.log('');
        console.log('Next steps:');
        console.log('  1. Deploy to Vercel: vercel');
        console.log('  2. Add environment variables in Vercel dashboard');
        console.log('  3. Configure webhooks');
        console.log('');
        console.log('See EMAIL_SETUP_GUIDE.md for complete instructions.');

    } catch (error) {
        console.error('❌ Error sending email:');
        console.error(error.message);
        console.error('');

        if (error.message.includes('Invalid login')) {
            console.error('💡 This usually means:');
            console.error('  1. Wrong email or password');
            console.error('  2. Not using App Password (must use 16-digit App Password, not regular password)');
            console.error('  3. 2-Step Verification not enabled');
            console.error('');
            console.error('See EMAIL_SETUP_GUIDE.md, STEP 1 for detailed instructions.');
        }

        process.exit(1);
    }
}

sendTestEmail();
