// Simple email test script
import 'dotenv/config';
import nodemailer from 'nodemailer';

const testEmail = process.argv[2];

if (!testEmail) {
    console.error('❌ Usage: node api/test-email-simple.js your-email@example.com');
    process.exit(1);
}

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Email chưa được cấu hình!');
    console.error('');
    console.error('Vui lòng tạo file .env với nội dung:');
    console.error('EMAIL_USER=email-cua-ban@gmail.com');
    console.error('EMAIL_PASS=mat-khau-app-16-chu-so');
    console.error('EMAIL_SERVICE=gmail');
    console.error('');
    console.error('Xem EMAIL_SETUP_GUIDE.md để biết cách lấy App Password.');
    process.exit(1);
}

console.log('📧 Đang test cấu hình email...\n');
console.log('Từ:', process.env.EMAIL_USER);
console.log('Đến:', testEmail);
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
        console.log('⏳ Đang kiểm tra kết nối SMTP...');
        await transporter.verify();
        console.log('✅ Kết nối SMTP thành công!\n');

        const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"></head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 12px; margin-bottom: 20px;">
          <h1 style="margin: 0;">🎉 Email Test Thành Công!</h1>
        </div>
        <div style="padding: 20px; background-color: #f7fafc; border-radius: 8px;">
          <h2 style="color: #2d3748;">Chúc mừng!</h2>
          <p style="color: #4a5568;">Hệ thống email đã hoạt động đúng và sẵn sàng gửi email tự động!</p>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 0; color: #4a5568;">
              <strong>From:</strong> ${process.env.EMAIL_USER}<br>
              <strong>To:</strong> ${testEmail}<br>
              <strong>Time:</strong> ${new Date().toLocaleString('vi-VN')}
            </p>
          </div>
          <div style="background: #d4edda; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
            <strong style="color: #155724;">✅ Tiếp theo:</strong>
            <ol style="color: #155724; margin: 10px 0 0 0;">
              <li>Chạy <code>npm run dev</code> để test donation form</li>
              <li>Deploy lên Vercel khi sẵn sàng</li>
            </ol>
          </div>
        </div>
      </body>
      </html>
    `;

        console.log('📮 Đang gửi email test...');
        const info = await transporter.sendMail({
            from: `"Nuôi Tôi - Test" <${process.env.EMAIL_USER}>`,
            to: testEmail,
            subject: '🎉 Test Email - Hệ Thống Donation Tự Động',
            html: emailHtml
        });

        console.log('\n✅ ĐÃ GỬI EMAIL THÀNH CÔNG!');
        console.log('Message ID:', info.messageId);
        console.log('\n📬 Vui lòng kiểm tra hộp thư của bạn!');
        console.log('   (Nếu không thấy, check spam folder)');
        console.log('\n🎉 Hệ thống email HOẠT ĐỘNG HOÀN HẢO!');
        console.log('\n📝 Tiếp theo:');
        console.log('   1. Chạy: npm run dev');
        console.log('   2. Mở: http://localhost:5173');
        console.log('   3. Test donation form trên website\n');

    } catch (error) {
        console.error('\n❌ LỖI KHI GỬI EMAIL:');
        console.error('   ', error.message);
        console.error('');

        if (error.message.includes('Invalid login') || error.message.includes('535')) {
            console.error('💡 NGUYÊN NHÂN THƯỜNG GẶP:');
            console.error('   1. ❌ Sai email hoặc mật khẩu trong file .env');
            console.error('   2. ❌ Chưa dùng App Password (PHẢI dùng App Password 16 chữ số)');
            console.error('   3. ❌ Chưa bật 2-Step Verification trên Gmail');
            console.error('');
            console.error('🔧 CÁCH SỬA:');
            console.error('   1. Vào: https://myaccount.google.com/apppasswords');
            console.error('   2. Tạo App Password mới cho "Mail"');
            console.error('   3. Copy 16 chữ số vào .env → EMAIL_PASS (bỏ khoảng trắng)');
            console.error('');
            console.error('📖 Chi tiết: xem EMAIL_SETUP_GUIDE.md');
        }

        process.exit(1);
    }
}

sendTestEmail();
