# Hướng dẫn Setup Email Tự Động cho Donation

## 🎯 Tổng quan

Hệ thống này cho phép tự động gửi email cảm ơn khi nhận được donation thông qua:
- Buy Me a Coffee
- VNPay, MoMo, ZaloPay (payment gateways Việt Nam)

## 📋 Yêu cầu

- Node.js 18+
- Tài khoản Gmail (hoặc email service khác)
- Tài khoản Buy Me a Coffee (nếu dùng)

---

## 🔧 BƯỚC 1: Cấu hình Email Service

### Option A: Sử dụng Gmail (Khuyến nghị cho test)

#### 1. Tạo Gmail App Password

> **QUAN TRỌNG**: Không dùng password Gmail thường! Phải dùng App Password.

**Các bước:**

1. Vào Google Account: https://myaccount.google.com/
2. Vào Security (Bảo mật)
3. Bật 2-Step Verification (Xác thực 2 bước) nếu chưa bật
4. Sau khi bật 2FA, vào **App passwords**: https://myaccount.google.com/apppasswords
5. Chọn:
   - App: **Mail**
   - Device: **Other (Custom name)** → nhập "Nuoi Toi Website"
6. Click **Generate**
7. Copy 16-digit password (dạng: `xxxx xxxx xxxx xxxx`)

#### 2. Cấu hình trong project

Tạo file `.env` trong thư mục root (ngang với `package.json`):

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx    # 16-digit App Password
EMAIL_SERVICE=gmail

# Node environment
NODE_ENV=development
```

> **Lưu ý**: 
> - File `.env` đã có trong `.gitignore`, an toàn không bị commit lên Git
> - Có thể xóa khoảng trắng trong App Password: `xxxxxxxxxxxxxxxx`

### Option B: Sử dụng dịch vụ email chuyên nghiệp (Production)

Nếu deploy production và gửi nhiều email, nên dùng dịch vụ chuyên dụng:

#### SendGrid (Free tier: 100 emails/day)

```env
EMAIL_SERVICE=SendGrid
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

#### Mailgun (Free tier: 5,000 emails/month)

```env
EMAIL_SERVICE=Mailgun
EMAIL_USER=your-mailgun-smtp-username
EMAIL_PASS=your-mailgun-smtp-password
```

#### AWS SES (Pay as you go, rất rẻ)

```env
EMAIL_SERVICE=SES
EMAIL_USER=your-ses-access-key
EMAIL_PASS=your-ses-secret-key
```

---

## 🧪 BƯỚC 2: Test Email Locally

### 1. Cài đặt dependencies

```bash
cd c:\Users\Dell\Downloads\noi-toi
npm install
```

### 2. Tạo test script

File này đã được tạo sẵn: `api/test-email.js`

### 3. Chạy test

```bash
# Test gửi email
node api/test-email.js your-email@gmail.com
```

Kiểm tra:
- [ ] Email đã được gửi thành công
- [ ] Email không rơi vào spam folder
- [ ] Template hiển thị đẹp trên mobile và desktop

---

## 🚀 BƯỚC 3: Deploy API lên Vercel

### 1. Cài đặt Vercel CLI

```bash
npm install -g vercel
```

### 2. Login Vercel

```bash
vercel login
```

### 3. Deploy

```bash
cd c:\Users\Dell\Downloads\noi-toi
vercel
```

Làm theo hướng dẫn:
- Set up and deploy: **Yes**
- Project name: `nuoi-toi` (hoặc tên bạn muốn)
- Directory: `.` (current directory)
- Production: **Yes**

### 4. Cấu hình Environment Variables trên Vercel

Sau khi deploy, vào Vercel Dashboard:

1. Vào project → **Settings** → **Environment Variables**
2. Thêm các biến:

```
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = your-app-password
EMAIL_SERVICE = gmail
NODE_ENV = production
```

3. Click **Save**
4. **Redeploy** project để apply env vars

---

## 🔗 BƯỚC 4: Cấu hình Webhook

### Buy Me a Coffee Webhook

1. Vào Buy Me a Coffee Dashboard: https://buymeacoffee.com/dashboard
2. **Integrations** → **Webhooks**
3. Webhook URL: `https://your-vercel-url.vercel.app/api/webhook/buymeacoffee`
4. Copy **Webhook Secret**
5. Thêm vào Vercel env vars:
   ```
   BMC_WEBHOOK_SECRET = your-webhook-secret
   ```

### Payment Gateways Việt Nam (Tuỳ chọn)

#### VNPay

```env
VNPAY_SECRET_KEY=your-secret-key
VNPAY_TMN_CODE=your-merchant-code
```

Webhook URL: `https://your-domain.vercel.app/api/webhook/vnpay`

#### MoMo

```env
MOMO_ACCESS_KEY=your-access-key
MOMO_SECRET_KEY=your-secret-key
MOMO_PARTNER_CODE=your-partner-code
```

Webhook URL: `https://your-domain.vercel.app/api/webhook/momo`

---

## ✅ BƯỚC 5: Testing End-to-End

### Test Frontend Registration

1. Mở website local: `npm run dev`
2. Vào donation section
3. Nhập email của bạn
4. Click "Nhận mã donation"
5. Kiểm tra email → Phải nhận được "Đăng ký thành công"

### Test Buy Me a Coffee Donation

1. Copy donation code từ website
2. Vào https://buymeacoffee.com/nuoitoi.com
3. Donate với một số tiền nhỏ (tối thiểu)
4. Nhập donation code vào message
5. Complete payment
6. Kiểm tra email → Phải nhận được "Cảm ơn bạn đã ủng hộ"

---

## 🐛 Troubleshooting

### Email không được gửi

1. **Check logs trên Vercel**:
   - Vào Dashboard → Deployment → View Function Logs
   
2. **Common issues**:
   - Sai App Password → Tạo lại App Password mới
   - Chưa bật 2FA → Bật 2-Step Verification
   - Email rơi vào spam → Whitelist email sender

### Webhook không hoạt động

1. **Test webhook URL**:
   ```bash
   curl -X POST https://your-domain.vercel.app/api/webhook/buymeacoffee \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
   ```

2. **Check Vercel logs** để xem request có đến không

3. **Verify webhook signature** đúng chưa

### Rate limiting

Nếu gửi quá nhiều email trong thời gian ngắn:
- Hệ thống tự động block (max 3 emails/phút per email)
- Đợi 1 phút rồi thử lại

---

## 📊 Monitoring và Logging

### View logs

**Local development:**
```bash
# Terminal sẽ show logs realtime
npm run dev
```

**Production (Vercel):**
- Vào Dashboard → Functions → View Logs
- Có thể integrate với Sentry, LogRocket cho advanced monitoring

### Database

Donation history được lưu trong: `data/donations.json`

View donations:
```bash
# GET endpoint
curl https://your-domain.vercel.app/api/donations
```

---

## 🔒 Security Best Practices

1. ✅ **Không commit `.env`** vào Git
2. ✅ **Rotate secrets** định kỳ (3-6 tháng)
3. ✅ **Sử dụng HTTPS** cho tất cả endpoints
4. ✅ **Validate webhook signatures** (đã implement)
5. ✅ **Rate limiting** (đã implement)
6. ✅ **Sanitize inputs** (đã implement)

---

## 📞 Support

Nếu gặp vấn đề:

1. Check documentation này trước
2. View logs để debug
3. Google error message
4. Liên hệ: support@nuoitoi.com

---

## 🎉 Hoàn thành!

Sau khi setup xong, hệ thống sẽ:

✅ Tự động gửi email pending khi user đăng ký  
✅ Tự động gửi email cảm ơn khi nhận donation  
✅ Lưu lại lịch sử donations  
✅ Bảo mật và chống spam  

Chúc mừng bạn đã có hệ thống donation automation hoàn chỉnh! 🚀
