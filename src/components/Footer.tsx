import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-white p-6">
      {/* Lời Nhắn Từ Trái Tim Section */}
      <div className="mb-6">
        {/* Header với border trái màu đỏ */}
        <div className="flex items-center gap-3 mb-4 border-l-8 border-red-500 pl-6 py-2">
          <span className="text-2xl">🔧</span>
          <h2 className="text-xl font-semibold text-blue-600">{t('footer.title')}</h2>
        </div>

        {/* Message content với background hồng nhạt */}
        <div className="bg-pink-50 border-l-4 border-pink-400 p-5 rounded-r-xl">
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              {t('footer.message1')} <span className="text-red-600 font-bold"> {t('footer.message2')}</span>
            </p>
            
            <p>
              {t('footer.message3')}
            </p>
            
            <p className="italic text-gray-600">
              {t('footer.ps')}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 text-center border-t pt-4">
        <p>
          {t('footer.disclaimer')}
        </p>
      </div>
    </footer>
  );
}
