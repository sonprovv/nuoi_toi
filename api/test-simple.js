// Ultra simple email test
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const testEmail = process.argv[2] || 'test@example.com';

console.log('📧 Testing email...\n');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***configured***' : 'NOT SET');
console.log('To:', testEmail);
console.log();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ ERROR: EMAIL_USER or EMAIL_PASS not set in .env file');
    console.error('\nYour .env file should have:');
    console.error('EMAIL_USER=your-email@gmail.com');
    console.error('EMAIL_PASS=your-16-digit-app-password');
    process.exit(1);
}

const config = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};

console.log('Creating transporter...');
const transporter = nodemailer.createTransporter(config);

console.log('Verifying connection...');
transporter.verify()
    .then(() => {
        console.log('✅ SMTP connection OK!\n');
        console.log('Sending test email...');

        return transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: testEmail,
            subject: 'Test Email - Nuôi Tôi System',
            html: '<h1>✅ Email works!</h1><p>Your email system is configured correctly.</p>'
        });
    })
    .then((info) => {
        console.log('✅ EMAIL SENT!');
        console.log('Message ID:', info.messageId);
        console.log('\n🎉 SUCCESS! Check your email inbox!');
    })
    .catch((error) => {
        console.error('\n❌ ERROR:', error.message);

        if (error.code === 'EAUTH' || error.message.includes('Invalid login')) {
            console.error('\n💡 This means:');
            console.error('  - Wrong email or password');
            console.error('  - NOT using App Password (must be 16-digit App Password)');
            console.error('  - 2-Step Verification not enabled');
            console.error('\nTo fix:');
            console.error('  1. Go to: https://myaccount.google.com/apppasswords');
            console.error('  2. Create App Password for Mail');
            console.error('  3. Copy 16-digit password to .env file');
        }
        process.exit(1);
    });
