import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { DonationForm } from './DonationForm';

export function DonationSection() {
  const { t } = useLanguage();
  const [currentDonationCode, setCurrentDonationCode] = useState('');

  // Load Buy Me a Coffee widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
    script.setAttribute('data-name', 'BMC-Widget');
    script.setAttribute('data-cfasync', 'false');
    script.setAttribute('data-id', 'sondev');
    script.setAttribute('data-description', 'Support me on Buy me a coffee!');
    script.setAttribute('data-message', currentDonationCode ? `Mã donation: ${currentDonationCode}` : 'Cảm ơn bạn đã ghé thăm! Hãy mua cho tôi một ly cà phê nếu bạn thích website này 😊');
    script.setAttribute('data-color', '#FF813F');
    script.setAttribute('data-position', 'Right');
    script.setAttribute('data-x_margin', '18');
    script.setAttribute('data-y_margin', '18');
    script.async = true;

    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [currentDonationCode]);

  const handleBuyMeACoffeeClick = () => {
    window.open('https://buymeacoffee.com/sondev', '_blank');
  };

  return (
    <section className="bg-gradient-to-br from-orange-200 via-pink-200 to-orange-300 rounded-2xl shadow-lg p-8 text-center">
      {/* Header */}
      <h2 className="text-lg font-bold text-red-600 mb-4">
        💳 {t('donation.title')}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-6">
        {t('donation.description')}{' '}
        <a
          href="https://buymeacoffee.com/sondev"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://buymeacoffee.com/sondev
        </a>
      </p>

      {/* Step 1: Email Registration Form */}
      <div className="mb-6">
        <DonationForm
          onSuccess={(code) => {
            setCurrentDonationCode(code);
          }}
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 border-t-2 border-gray-300"></div>
        <span className="text-gray-500 font-semibold">Sau đó chọn cách donate</span>
        <div className="flex-1 border-t-2 border-gray-300"></div>
      </div>

      {/* Buy Me a Coffee Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* QR Code Option */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            📱 Quét QR Code
          </h3>
          <div className="bg-gray-50 p-4 rounded-xl mb-4">
            <img
              src="/img.png"
              alt="QR Code để donate"
              className="w-40 h-40 mx-auto rounded-xl object-cover"
            />
          </div>
          <p className="text-xs text-gray-600">
            Quét mã QR để mở Buy Me a Coffee trên điện thoại
          </p>
          {currentDonationCode && (
            <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
              <p className="text-xs text-yellow-800">
                💡 Nhớ ghi mã: <strong>{currentDonationCode}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Direct Link Option */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            💻 Donate Trực Tiếp
          </h3>
          <div className="space-y-3">
            <button
              onClick={handleBuyMeACoffeeClick}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              ☕ Buy Me a Coffee
            </button>
            <p className="text-xs text-gray-600">
              Tự động gửi email xác nhận sau khi donate
            </p>
            {currentDonationCode && (
              <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
                <p className="text-xs text-yellow-800">
                  💡 Nhớ ghi mã: <strong>{currentDonationCode}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white/50 p-4 rounded-xl mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">✨ Ưu điểm của hệ thống:</h4>
        <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
          <div>✅ Email cảm ơn tự động</div>
          <div>✅ Thanh toán an toàn</div>
          <div>✅ Hỗ trợ nhiều phương thức</div>
          <div>✅ Minh bạch 100%</div>
        </div>
      </div>

      {/* Transfer note */}
      <p className="text-sm text-red-500 mb-6 font-medium">
        {t('donation.transfer')}
      </p>

      {/* CTA Button */}
      <button
        onClick={handleBuyMeACoffeeClick}
        className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg"
      >
        {t('donation.button')}
      </button>
    </section>
  );
}
