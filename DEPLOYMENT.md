# Deployment Guide - Nuôi Tôi Payment System

## 📦 Deploy to Vercel (Recommended)

Vercel cung cấp hosting miễn phí cho frontend và API functions.

### Prerequisites

- Node.js 18+
- Tài khoản Vercel (free): https://vercel.com/signup
- Email đã cấu hình (xem `EMAIL_SETUP_GUIDE.md`)

---

## 🚀 Quick Deploy

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

Làm theo hướng dẫn để login (qua email hoặc GitHub).

### 3. Deploy

```bash
cd c:\Users\Dell\Downloads\noi-toi
vercel
```

**Khi được hỏi:**
- `Set up and deploy?` → **Yes**
- `Which scope?` → Chọn account của bạn
- `Link to existing project?` → **No**
- `Project name?` → `nuoi-toi` (hoặc tên bạn muốn)
- `In which directory is your code located?` → `./` (enter)
- `Override settings?` → **No**

Vercel sẽ build và deploy. Sau khi hoàn thành, bạn sẽ nhận được:
- **Preview URL**: `https://nuoi-toi-xxx.vercel.app`
- **Production URL**: `https://nuoi-toi.vercel.app` (sau khi promote)

### 4. Configure Environment Variables

**Via Dashboard:**

1. Vào https://vercel.com/dashboard
2. Chọn project `nuoi-toi`
3. Settings → Environment Variables
4. Add các biến sau:

```
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = your-16-digit-app-password
EMAIL_SERVICE = gmail
NODE_ENV = production
BMC_WEBHOOK_SECRET = your-webhook-secret (optional)
WEBSITE_URL = https://nuoi-toi.vercel.app
```

**Via CLI:**

```bash
# Add environment variables
vercel env add EMAIL_USER
# Nhập value: your-email@gmail.com

vercel env add EMAIL_PASS
# Nhập value: your-16-digit-app-password

# ... repeat cho các biến khác
```

### 5. Redeploy với Environment Variables

```bash
vercel --prod
```

---

## 🔧 Configure Webhooks

### Buy Me a Coffee

1. Vào https://buymeacoffee.com/dashboard
2. **Integrations** → **Webhooks**
3. **Add Webhook**:
   - URL: `https://your-domain.vercel.app/api/webhook/buymeacoffee`
   - Events: `payment.created`
4. Copy **Webhook Secret**
5. Add vào Vercel env: `BMC_WEBHOOK_SECRET`

### Payment Gateways Việt Nam

**VNPay:**
- IPN URL: `https://your-domain.vercel. app/api/webhook/vnpay`

**MoMo:**
- Callback URL: `https://your-domain.vercel.app/api/webhook/momo`

---

## ✅ Verify Deployment

### 1. Test Frontend

Vào `https://your-domain.vercel.app`

Kiểm tra:
- [ ] Trang load thành công
- [ ] Donation form hiển thị
- [ ] Có thể submit email
- [ ] UI responsive trên mobile

### 2. Test API Endpoints

```bash
# Test donation registration
curl -X POST https://your-domain.vercel.app/api/donation/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'

# Expected response:
# {"success":true,"donationCode":"DONATE_xxx","message":"Donation registered successfully"}
```

### 3. Test Email

```bash
curl -X POST https://your-domain.vercel.app/api/test/email \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@gmail.com"}'
```

Kiểm tra email inbox (và spam folder).

### 4. View Logs

```bash
# Realtime logs
vercel logs

# Or via dashboard
# https://vercel.com/dashboard → Project → Deployments → View Function Logs
```

---

## 🔄 Update Deployment

### Update code

```bash
git add .
git commit -m "Update payment system"
vercel --prod
```

### Update environment variables

```bash
# Via CLI
vercel env rm EMAIL_USER production
vercel env add EMAIL_USER production

# Or via Dashboard
# Settings → Environment Variables → Edit
```

---

## 🌐 Custom Domain (Optional)

### 1. Add Domain in Vercel

1. Project → Settings → Domains
2. Add domain: `nuoitoi.com`
3. Follow DNS configuration instructions

### 2. Update DNS Records

Add records tại domain registrar:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

### 3. Update Environment Variables

```bash
vercel env add WEBSITE_URL production
# Value: https://nuoitoi.com
```

---

## 🐛 Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Locally install dependencies
npm install

# Redeploy
vercel --prod
```

**Error: API routes not working**
- Kiểm tra `vercel.json` đúng cấu hình
- API files phải ở `/api/` directory
- Files phải có extension `.js` (not `.ts`)

### Environment Variables Not Working

```bash
# List all env vars
vercel env ls

# Pull env to local
vercel env pull .env.local

# Redeploy after adding env vars
vercel --prod
```

### Emails Not Sending

1. Check Vercel logs: `vercel logs --follow`
2. Verify EMAIL_USER và EMAIL_PASS đúng
3. Test với script local: `npm run test:email your-email@gmail.com`

### Webhook Not Triggering

1. Check webhook URL accessible:
   ```bash
   curl https://your-domain.vercel.app/api/webhook/buymeacoffee
   ```
2. Verify webhook configured correctly in BMC dashboard
3. Check Vercel function logs

---

## 📊 Monitoring

### Vercel Analytics (Free)

1. Project → Analytics
2. View:
   - Page views
   - API requests
   - Performance metrics

### Error Tracking

Integrate Sentry (optional):

```bash
npm install @sentry/node
```

```javascript
// api/donation-handler.js
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
```

---

## 💾 Database (Optional Upgrade)

Hiện tại dùng JSON file. Để scale lên, nên dùng database:

### MongoDB Atlas (Free tier)

```bash
npm install mongodb
```

```env
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/nuoi-toi
```

### Vercel Postgres (Beta)

```bash
npm install @vercel/postgres
```

---

## 🎉 Production Checklist

Before going live:

- [ ] Environment variables configured
- [ ] Email sending working
- [ ] Webhooks configured and tested
- [ ] Custom domain setup (optional)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Test end-to-end donation flow
- [ ] Monitor logs for errors
- [ ] Backup `.env` variables safely

---

## 📞 Support

Issues? Check:
1. Vercel logs: `vercel logs`
2. Function logs in dashboard
3. Email setup guide: `EMAIL_SETUP_GUIDE.md`
4. Vercel docs: https://vercel.com/docs

Happy deploying! 🚀
