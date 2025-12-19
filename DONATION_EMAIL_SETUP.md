# Hướng dẫn Setup Email Notification cho Donation

## 1. Cấu hình Email Service

### Sử dụng Gmail:
1. Tạo App Password cho Gmail:
   - Vào Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Tạo password cho "Mail"

2. Cập nhật file `.env`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
```

## 2. Deploy Backend API

### Option 1: Vercel Functions
```bash
# Tạo thư mục api/ trong root project
# File api/donation-handler.js đã được tạo
npm install nodemailer
vercel deploy
```

### Option 2: Netlify Functions
```bash
# Di chuyển file vào netlify/functions/
mkdir netlify/functions
mv api/donation-handler.js netlify/functions/
```

### Option 3: Separate Backend Server
```bash
# Tạo server Express.js riêng
npm init -y
npm install express nodemailer cors dotenv
# Deploy lên Railway, Render, hoặc VPS
```

## 3. Tích hợp với Ngân hàng

### Các ngân hàng hỗ trợ API:
- **Vietcombank**: VCB-API
- **Techcombank**: Open API
- **VPBank**: VPBank API
- **MBBank**: MB API

### Webhook từ Payment Gateway:
- **VNPay**: Webhook notification
- **ZaloPay**: Callback URL
- **MoMo**: IPN (Instant Payment Notification)

## 4. Luồng hoạt động

1. **User nhập email** → Hiển thị QR + mã donate unique
2. **User chuyển khoản** với mã donate trong nội dung
3. **Backend polling/webhook** nhận thông tin giao dịch
4. **Tìm mã donate** trong nội dung chuyển khoản
5. **Gửi email cảm ơn** tự động

## 5. Testing

### Test local:
```bash
# Chạy backend
node api/donation-handler.js

# Test webhook
curl -X POST http://localhost:3000/webhook/bank \
  -H "Content-Type: application/json" \
  -d '{
    "transactionContent": "Ung ho DONATE_1703123456789",
    "amount": 50000,
    "transactionId": "TXN123456"
  }'
```

## 6. Security Notes

- Sử dụng HTTPS cho tất cả endpoints
- Validate webhook signature từ ngân hàng
- Rate limiting cho API endpoints
- Encrypt sensitive data trong database
- Log tất cả transactions để audit

## 7. Alternative Solutions

### Sử dụng dịch vụ có sẵn:
- **Buy Me a Coffee**: Có webhook và email tự động
- **Ko-fi**: Hỗ trợ webhook notifications  
- **PayPal**: PayPal IPN
- **Stripe**: Webhook events

### Tích hợp QR Banking:
- **Napas 247**: QR Code chuẩn Việt Nam
- **VietQR**: QR Code liên ngân hàng
- **Smart Banking**: API từ các ngân hàng lớn