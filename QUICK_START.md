# 🎯 Quick Start Guide - Hệ Thống Email Tự Động

## Bạn đã có gì?

✅ **Backend API** hoàn chỉnh để xử lý donations và webhooks  
✅ **Email templates** đẹp với HTML responsive  
✅ **Frontend form** để thu thập email người donate  
✅ **Security features** (validation, rate limiting, sanitization)  
✅ **Documentation** chi tiết  

## 🚀 3 Bước Để Bắt Đầu

### Bước 1: Setup Email (5 phút)

1. Tạo Gmail App Password:
   - Vào https://myaccount.google.com/apppasswords
   - Tạo password cho "Mail"
   - Copy 16-digit password

2. Tạo file `.env` trong thư mục root:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=xxxx-xxxx-xxxx-xxxx
   EMAIL_SERVICE=gmail
   NODE_ENV=development
   ```

3. Test email:
   ```bash
   npm run test:email your-email@gmail.com
   ```

**Chi tiết:** [EMAIL_SETUP_GUIDE.md](file:///c:/Users/Dell/Downloads/noi-toi/EMAIL_SETUP_GUIDE.md)

---

### Bước 2: Test Local (2 phút)

```bash
# Chạy development server
npm run dev
```

Mở browser: `http://localhost:5173`

Test flow:
1. Scroll xuống Donation Section
2. Nhập email của bạn
3. Click "Nhận mã donation"
4. Check email inbox → Phải nhận email pending confirmation
5. Copy donation code hiển thị

---

### Bước 3: Deploy to Production (10 phút)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

Sau đó:
1. Add environment variables trên Vercel Dashboard
2. Setup webhook URLs trong Buy Me a Coffee
3. Test với real donation

**Chi tiết:** [DEPLOYMENT.md](file:///c:/Users/Dell/Downloads/noi-toi/DEPLOYMENT.md)

---

## 📁 File Structure

```
noi-toi/
├── api/
│   ├── donation-handler.js      # Main API (6 endpoints)
│   ├── email-templates.js       # Beautiful email templates
│   ├── webhook-validator.js     # Security & validation
│   └── test-email.js            # Email testing script
├── src/
│   ├── components/
│   │   ├── DonationForm.tsx     # Email registration form
│   │   └── DonationSection.tsx  # Main donation UI
│   └── utils/
│       └── validation.ts        # Frontend validation
├── .env.example                 # Environment config template
├── vercel.json                  # Deployment config
├── EMAIL_SETUP_GUIDE.md         # Email setup instructions
├── DEPLOYMENT.md                # Deployment guide
└── QUICK_START.md               # This file
```

---

## 🎨 Features Highlights

### Email Automation
- ✅ Pending email khi đăng ký
- ✅ Thank you email sau donation
- ✅ Bilingual (Việt/Anh)
- ✅ Beautiful HTML templates

### Payment Integration
- ✅ Buy Me a Coffee
- ✅ VNPay (ready)
- ✅ MoMo (ready)
- ✅ ZaloPay (ready)

### Security
- ✅ Webhook signature validation
- ✅ Rate limiting (3 emails/min)
- ✅ Input sanitization
- ✅ Email validation

### Developer Experience
- ✅ TypeScript support
- ✅ Easy testing với npm scripts
- ✅ Comprehensive error messages
- ✅ Detailed logging

---

## ❓ FAQ

**Q: Tôi chưa setup email được gửi chưa?**  
A: Chưa. Bạn cần làm Bước 1 trước. Xem [EMAIL_SETUP_GUIDE.md](file:///c:/Users/Dell/Downloads/noi-toi/EMAIL_SETUP_GUIDE.md)

**Q: Email có bị spam không?**  
A: Gmail free có limit 500 emails/day. Production nên dùng SendGrid/Mailgun.

**Q: Webhook làm sao setup?**  
A: Sau khi deploy Vercel, copy webhook URL và paste vào Buy Me a Coffee dashboard.

**Q: Database ở đâu?**  
A: Hiện dùng JSON file (`data/donations.json`). Có thể upgrade MongoDB sau.

**Q: Có cần server riêng không?**  
A: Không. Vercel Functions free là đủ.

---

## 🐛 Troubleshooting

**Email không được gửi:**
- Check `.env` file có đúng không
- Verify App Password (không phải password thường!)
- Check spam folder

**Frontend compile error:**
- Chạy `npm install` lại
- Check TypeScript errors

**Webhook không hoạt động:**
- Verify deploy thành công
- Check Vercel function logs
- Test webhook URL với curl

---

## 📞 Need Help?

1. Check [EMAIL_SETUP_GUIDE.md](file:///c:/Users/Dell/Downloads/noi-toi/EMAIL_SETUP_GUIDE.md)
2. Check [DEPLOYMENT.md](file:///c:/Users/Dell/Downloads/noi-toi/DEPLOYMENT.md)
3. View [walkthrough.md](file:///C:/Users/Dell/.gemini/antigravity/brain/55d1b371-3851-49db-b338-fe543d13b205/walkthrough.md) for full details

---

**🎉 That's it! Chúc bạn thành công!**
