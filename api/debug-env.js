// DEBUG - Check env variables
console.log('=== CHECKING ENVIRONMENT ===\n');

import dotenv from 'dotenv';
const result = dotenv.config();

if (result.error) {
    console.error('Error loading .env:', result.error);
} else {
    console.log('✅ .env loaded successfully');
}

console.log('\nEnvironment variables:');
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.substring(process.env.EMAIL_PASS.length - 4) : 'NOT SET');
console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE || 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('\n❌ Email not configured properly!');
    console.log('\nYour .env file should look like:');
    console.log('EMAIL_USER=sonpt2304@gmail.com');
    console.log('EMAIL_PASS=abcdefghijklmnop  (16-digit App Password)');
    console.log('EMAIL_SERVICE=gmail');
} else {
    console.log('\n✅ Environment variables are set!');
    console.log('\nNow testing nodemailer...\n');

    import('nodemailer').then((nodemailerModule) => {
        const nodemailer = nodemailerModule.default;

        console.log('✅ Nodemailer imported');

        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log('✅ Transporter created');
        console.log('\nTesting SMTP connection...');

        transporter.verify((error, success) => {
            if (error) {
                console.error('\n❌ SMTP Error:', error.message);

                if (error.code === 'EAUTH') {
                    console.error('\n💡 This is an authentication error!');
                    console.error('Possible causes:');
                    console.error('  1. Wrong email or password');
                    console.error('  2. Not using App Password (must be 16-digit from Google)');
                    console.error('  3. 2-Step Verification not enabled');
                    console.error('\nTo fix:');
                    console.error('  → Go to: https://myaccount.google.com/apppasswords');
                    console.error('  → Create new App Password for "Mail"');
                    console.error('  → Copy all 16 digits to .env EMAIL_PASS');
                }
            } else {
                console.log('\n✅ SMTP CONNECTION SUCCESSFUL!');
                console.log('\nYour email is configured correctly!');
                console.log('You can now test sending emails.\n');
            }
        });
    }).catch((err) => {
        console.error('Error importing nodemailer:', err);
    });
}
