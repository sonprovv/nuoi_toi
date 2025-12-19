// Email Templates cho hệ thống donation
// Hỗ trợ tiếng Việt và tiếng Anh

/**
 * Template email cảm ơn người donate
 * @param {Object} data - Thông tin donation
 * @param {string} data.name - Tên người donate
 * @param {string} data.email - Email người donate
 * @param {number} data.amount - Số tiền donate
 * @param {string} data.donationCode - Mã donation unique
 * @param {string} data.transactionId - Mã giao dịch
 * @param {string} data.message - Lời nhắn từ người donate
 * @param {string} data.language - Ngôn ngữ (vi/en)
 */
export function getThankYouEmailTemplate(data) {
    const isVietnamese = data.language === 'vi' || !data.language;

    const content = isVietnamese ? {
        subject: '🙏 Cảm ơn bạn đã ủng hộ Nuôi Tôi!',
        greeting: 'Xin chào',
        thankYouTitle: 'Cảm ơn bạn đã ủng hộ!',
        receivedMessage: 'Chúng tôi đã nhận được khoản ủng hộ của bạn với thông tin:',
        donationCodeLabel: 'Mã donation:',
        amountLabel: 'Số tiền:',
        transactionIdLabel: 'Mã giao dịch:',
        timeLabel: 'Thời gian:',
        messageLabel: 'Lời nhắn:',
        supportMessage: 'Sự ủng hộ của bạn sẽ giúp chúng tôi duy trì và phát triển dự án <strong>Nuôi Tôi</strong> - nền tảng minh bạch 100% về chi tiêu nuôi con.',
        whatYouGetTitle: 'Bạn sẽ nhận được:',
        weeklyReport: 'Báo cáo chi tiêu hàng tuần qua email',
        realtimeNotification: 'Thông báo realtime mọi chi tiêu',
        transparentReport: 'Sao kê minh bạch 100% mọi khoản chi',
        viewRealtimeButton: 'Xem Chi Tiêu Realtime',
        closingMessage: 'Một lần nữa, xin cảm ơn bạn rất nhiều!',
        footerNote: 'Đây là email tự động. Nếu có thắc mắc, vui lòng liên hệ:',
        websiteUrl: 'https://nuoitoi.com'
    } : {
        subject: '🙏 Thank You for Supporting Nuôi Tôi!',
        greeting: 'Hello',
        thankYouTitle: 'Thank You for Your Support!',
        receivedMessage: 'We have received your donation with the following information:',
        donationCodeLabel: 'Donation Code:',
        amountLabel: 'Amount:',
        transactionIdLabel: 'Transaction ID:',
        timeLabel: 'Time:',
        messageLabel: 'Message:',
        supportMessage: 'Your support helps us maintain and develop <strong>Nuôi Tôi</strong> - a 100% transparent platform for child-raising expenses.',
        whatYouGetTitle: 'What you will receive:',
        weeklyReport: 'Weekly expense reports via email',
        realtimeNotification: 'Realtime notifications for all expenses',
        transparentReport: '100% transparent records of all expenses',
        viewRealtimeButton: 'View Realtime Expenses',
        closingMessage: 'Thank you very much once again!',
        footerNote: 'This is an automated email. For questions, please contact:',
        websiteUrl: 'https://nuoitoi.com'
    };

    const formattedAmount = data.amount?.toLocaleString('vi-VN') || '0';
    const formattedDate = new Date().toLocaleString(isVietnamese ? 'vi-VN' : 'en-US');

    return {
        subject: content.subject,
        html: `
      <!DOCTYPE html>
      <html lang="${isVietnamese ? 'vi' : 'en'}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7fafc; padding: 20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header with gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                      🎉 ${content.thankYouTitle}
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                      Nuôi Tôi - Minh bạch 100%
                    </p>
                  </td>
                </tr>

                <!-- Main content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="margin: 0 0 20px 0; font-size: 16px; color: #2d3748; line-height: 1.6;">
                      ${content.greeting}${data.name ? ' ' + data.name : ''},
                    </p>
                    
                    <p style="margin: 0 0 25px 0; font-size: 16px; color: #2d3748; line-height: 1.6;">
                      ${content.receivedMessage}
                    </p>

                    <!-- Donation info card -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7fafc; border-radius: 8px; margin-bottom: 25px;">
                      <tr>
                        <td style="padding: 25px;">
                          ${data.donationCode ? `<p style="margin: 0 0 12px 0; font-size: 14px; color: #4a5568;">
                            <strong style="color: #2d3748;">${content.donationCodeLabel}</strong> ${data.donationCode}
                          </p>` : ''}
                          
                          <p style="margin: 0 0 12px 0; font-size: 20px; color: #2d3748;">
                            <strong style="color: #667eea;">${content.amountLabel}</strong> 
                            <span style="font-size: 24px; font-weight: bold; color: #e53e3e;">${formattedAmount} VNĐ</span>
                          </p>
                          
                          ${data.transactionId ? `<p style="margin: 0 0 12px 0; font-size: 14px; color: #4a5568;">
                            <strong style="color: #2d3748;">${content.transactionIdLabel}</strong> ${data.transactionId}
                          </p>` : ''}
                          
                          <p style="margin: 0 0 12px 0; font-size: 14px; color: #4a5568;">
                            <strong style="color: #2d3748;">${content.timeLabel}</strong> ${formattedDate}
                          </p>

                          ${data.message ? `<p style="margin: 12px 0 0 0; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #4a5568;">
                            <strong style="color: #2d3748;">${content.messageLabel}</strong><br>
                            <em style="color: #667eea;">"${data.message}"</em>
                          </p>` : ''}
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 25px 0; font-size: 16px; color: #2d3748; line-height: 1.6;">
                      ${content.supportMessage}
                    </p>

                    <!-- What you get -->
                    <div style="background-color: #edf2f7; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                      <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #2d3748;">
                        ✨ ${content.whatYouGetTitle}
                      </h3>
                      <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.8;">
                        <li>📊 ${content.weeklyReport}</li>
                        <li>📱 ${content.realtimeNotification}</li>
                        <li>🎯 ${content.transparentReport}</li>
                      </ul>
                    </div>

                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <a href="${content.websiteUrl}" style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
                            ${content.viewRealtimeButton}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 30px 0 0 0; font-size: 16px; color: #2d3748; text-align: center;">
                      ${content.closingMessage} <span style="color: #e53e3e; font-size: 20px;">❤️</span>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #edf2f7; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 13px; color: #718096; line-height: 1.6;">
                      ${content.footerNote} <a href="mailto:support@nuoitoi.com" style="color: #667eea; text-decoration: none;">support@nuoitoi.com</a>
                    </p>
                    <p style="margin: 10px 0 0 0; font-size: 12px; color: #a0aec0;">
                      © ${new Date().getFullYear()} Nuôi Tôi. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
    };
}

/**
 * Template email xác nhận đang chờ donation
 */
export function getPendingDonationTemplate(data) {
    const isVietnamese = data.language === 'vi' || !data.language;

    return {
        subject: isVietnamese ? '⏳ Đã đăng ký nhận thông báo donation' : '⏳ Donation Notification Registered',
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; border-radius: 12px; text-align: center; color: white; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 24px;">⏳ ${isVietnamese ? 'Đăng ký thành công!' : 'Successfully Registered!'}</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f7fafc; border-radius: 8px;">
          <p style="font-size: 16px; color: #2d3748;">
            ${isVietnamese ? 'Bạn đã đăng ký nhận thông báo donation với mã:' : 'You have registered for donation notification with code:'}
          </p>
          <p style="font-size: 24px; font-weight: bold; color: #667eea; text-align: center; margin: 20px 0;">
            ${data.donationCode}
          </p>
          <p style="font-size: 14px; color: #4a5568;">
            ${isVietnamese
                ? 'Vui lòng sử dụng mã này khi chuyển khoản. Chúng tôi sẽ gửi email xác nhận ngay khi nhận được donation.'
                : 'Please use this code when making a transfer. We will send a confirmation email upon receiving your donation.'}
          </p>
        </div>
      </body>
      </html>
    `
    };
}

/**
 * Template email báo cáo hàng tuần
 */
export function getWeeklyReportTemplate(data) {
    const isVietnamese = data.language === 'vi' || !data.language;

    return {
        subject: isVietnamese ? '📊 Báo cáo chi tiêu tuần này' : '📊 This Week\'s Expense Report',
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; color: white;">
          <h1>📊 ${isVietnamese ? 'Báo cáo tuần này' : 'Weekly Report'}</h1>
        </div>
        <div style="padding: 30px;">
          <p>${isVietnamese ? 'Cảm ơn bạn đã ủng hộ Nuôi Tôi!' : 'Thank you for supporting Nuôi Tôi!'}</p>
          <!-- Thêm nội dung báo cáo chi tiết -->
        </div>
      </body>
      </html>
    `
    };
}
