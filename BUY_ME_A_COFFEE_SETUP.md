# Hướng dẫn Setup Buy Me a Coffee

## 1. Cấu hình tài khoản Buy Me a Coffee

### Bước 1: Đăng nhập vào Buy Me a Coffee
- Truy cập: https://buymeacoffee.com/dashboard
- Đăng nhập với tài khoản của bạn

### Bước 2: Cấu hình Profile
- **Page URL**: Đảm bảo URL là `https://buymeacoffee.com/nuoitoi.com`
- **Display Name**: "Nuôi Tôi - Minh bạch 100%"
- **Bio**: "Tôi hứa sao kê đầy đủ! 💯 Mỗi đồng tiền donate đều được báo cáo minh bạch."
- **Avatar**: Upload logo của dự án
- **Cover Photo**: Có thể dùng screenshot của website

## 2. Cấu hình Email Notifications

### Trong Dashboard > Settings > Notifications:
```
✅ Email me when someone buys me a coffee
✅ Email me weekly summaries
✅ Email me monthly summaries
```

### Cấu hình Thank You Message:
```
🙏 Cảm ơn bạn đã ủng hộ dự án "Nuôi Tôi"!

Bạn sẽ nhận được:
📊 Báo cáo chi tiêu hàng tuần qua email
📱 Thông báo realtime khi có chi tiêu mới
🎯 Sao kê minh bạch 100% mọi khoản chi

Theo dõi chi tiêu realtime tại: [URL website của bạn]

Một lần nữa cảm ơn bạn rất nhiều! ❤️
```

## 3. Webhook Setup (Tùy chọn nâng cao)

### Bước 1: Tạo Webhook Endpoint
```javascript
// api/bmac-webhook.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { data } = req.body;
  
  // Verify webhook (nếu có secret)
  // const signature = req.headers['x-bmac-signature'];
  
  if (data && data.supporter_name && data.support_coffee_price) {
    // Gửi email custom hoặc lưu vào database
    await sendCustomThankYou({
      name: data.supporter_name,
      email: data.supporter_email,
      amount: data.support_coffee_price,
      message: data.support_message,
      timestamp: data.support_created_on
    });
    
    // Log để tracking
    console.log('New donation received:', {
      supporter: data.supporter_name,
      amount: data.support_coffee_price,
      timestamp: data.support_created_on
    });
  }

  res.status(200).json({ success: true });
}

async function sendCustomThankYou(donationData) {
  // Gửi email custom với template đẹp hơn
  // Hoặc cập nhật database để tracking
  // Hoặc gửi notification đến Slack/Discord
}
```

### Bước 2: Đăng ký Webhook trong BMC Dashboard
- Vào Settings > Webhooks
- Add webhook URL: `https://your-domain.com/api/bmac-webhook`
- Test webhook để đảm bảo hoạt động

## 4. Tích hợp Widget vào Website

### Widget tự động (đã implement):
```javascript
// Trong DonationSection.tsx
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
  script.setAttribute('data-id', 'nuoitoi.com'); // Thay bằng username của bạn
  // ... các thuộc tính khác
}, []);
```

### Button tùy chỉnh:
```html
<a href="https://buymeacoffee.com/nuoitoi.com" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
       alt="Buy Me A Coffee" 
       style="height: 60px !important;width: 217px !important;" />
</a>
```

## 5. Tracking và Analytics

### Trong BMC Dashboard:
- **Supporters**: Xem danh sách người ủng hộ
- **Revenue**: Theo dõi doanh thu theo thời gian
- **Messages**: Đọc tin nhắn từ supporters
- **Export Data**: Xuất dữ liệu để làm báo cáo

### Tạo báo cáo minh bạch:
```javascript
// Script để tạo báo cáo từ BMC data
const generateTransparencyReport = async () => {
  const donations = await fetchBMCDonations();
  const expenses = await fetchExpenseData();
  
  const report = {
    period: 'Tuần 1 - Tháng 12/2024',
    totalReceived: donations.reduce((sum, d) => sum + d.amount, 0),
    totalSpent: expenses.reduce((sum, e) => sum + e.amount, 0),
    balance: totalReceived - totalSpent,
    donations: donations.map(d => ({
      supporter: d.name || 'Anonymous',
      amount: d.amount,
      date: d.date,
      message: d.message
    })),
    expenses: expenses.map(e => ({
      category: e.category,
      description: e.description,
      amount: e.amount,
      date: e.date,
      receipt: e.receiptUrl
    }))
  };
  
  return report;
};
```

## 6. Email Templates

### Template cảm ơn tự động:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Cảm ơn bạn đã ủng hộ!</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
    <h1>🙏 Cảm ơn bạn đã ủng hộ!</h1>
    <p>Dự án "Nuôi Tôi - Minh bạch 100%"</p>
  </div>
  
  <div style="padding: 30px;">
    <h2>Thông tin donation:</h2>
    <ul>
      <li><strong>Số tiền:</strong> {{amount}} VNĐ</li>
      <li><strong>Thời gian:</strong> {{date}}</li>
      <li><strong>Tin nhắn:</strong> {{message}}</li>
    </ul>
    
    <h3>Bạn sẽ nhận được:</h3>
    <ul>
      <li>📊 Báo cáo chi tiêu hàng tuần</li>
      <li>📱 Thông báo realtime mọi chi tiêu</li>
      <li>🎯 Sao kê minh bạch 100%</li>
    </ul>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{website_url}}" style="background: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px;">
        Xem Chi Tiêu Realtime
      </a>
    </div>
  </div>
</body>
</html>
```

## 7. Best Practices

### Tần suất gửi email:
- **Ngay sau donation**: Email cảm ơn tự động
- **Hàng tuần**: Báo cáo tổng hợp chi tiêu
- **Hàng tháng**: Báo cáo tài chính chi tiết
- **Khi có chi tiêu lớn**: Thông báo đặc biệt

### Nội dung minh bạch:
- Luôn đính kèm hóa đơn/chứng từ
- Giải thích rõ lý do chi tiêu
- Cập nhật số dư còn lại
- Link đến trang web để xem chi tiết

### Tương tác với supporters:
- Trả lời mọi tin nhắn từ supporters
- Cảm ơn công khai trên social media (nếu được phép)
- Tạo community Discord/Telegram cho supporters
- Livestream định kỳ để báo cáo trực tiếp

## 8. Troubleshooting

### Nếu không nhận được email:
1. Kiểm tra spam folder
2. Verify email trong BMC settings
3. Kiểm tra notification settings
4. Contact BMC support nếu cần

### Nếu widget không hiển thị:
1. Kiểm tra username trong script
2. Đảm bảo script load sau khi DOM ready
3. Kiểm tra console errors
4. Test trên incognito mode

### Nếu webhook không hoạt động:
1. Verify webhook URL accessible
2. Kiểm tra SSL certificate
3. Test với ngrok cho local development
4. Check server logs cho errors