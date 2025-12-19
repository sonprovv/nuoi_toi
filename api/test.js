// Minimal test - step by step
console.log('Step 1: Import dotenv...');
import dotenv from 'dotenv';

console.log('Step 2: Load .env file...');
const result = dotenv.config();
if (result.error) {
    console.error('ERROR loading .env:', result.error);
    process.exit(1);
}

console.log('Step 3: Check environment variables...');
console.log('  EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('  EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('\n❌ Environment variables not set!');
    process.exit(1);
}

console.log('\nStep 4: Import nodemailer...');
import nodemailer from 'nodemailer';

console.log('Step 5: Create transporter...');
const config = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};

console.log('Config:', JSON.stringify({ ...config, auth: { ...config.auth, pass: '***' } }, null, 2));

const transporter = nodemailer.createTransport(config);

console.log('\n✅ Transporter created successfully!');
console.log('\nStep 6: Verify SMTP connection...');

transporter.verify((error, success) => {
    if (error) {
        console.error('\n❌ SMTP VERIFICATION FAILED!');
        console.error('Error:', error.message);
        console.error('Code:', error.code);

        if (error.code === 'EAUTH') {
            console.error('\n💡 Authentication Error! Possible causes:');
            console.error('  1. Wrong App Password');
            console.error('  2. 2-Step Verification not enabled');
            console.error('  3. App Password expired or revoked');
            console.error('\nSolution:');
            console.error('  → Go to: https://myaccount.google.com/apppasswords');
            console.error('  → Generate new App Password');
            console.error('  → Update .env file with new password');
        }
        process.exit(1);
    } else {
        console.log('\n✅✅✅ SMTP CONNECTION SUCCESSFUL! ✅✅✅\n');
        console.log('Step 7: Sending test email...');

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: '✅ Test - Hệ Thống Email Hoạt Động!',
            html: '<h1>🎉 Thành công!</h1><p>Email của bạn đã sẵn sàng!</p>'
        }, (err, info) => {
            if (err) {
                console.error('\n❌ Failed to send email:', err.message);
                process.exit(1);
            } else {
                console.log('\n✅ EMAIL SENT SUCCESSFULLY!');
                console.log('Message ID:', info.messageId);
                console.log('\n🎉🎉🎉 ALL TESTS PASSED! 🎉🎉🎉');
                console.log('\nYour email system is ready to use!');
                console.log('\nNext step: npm run dev');
            }
        });
    }
});
