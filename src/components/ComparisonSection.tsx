import { Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function ComparisonSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-white">
      {/* Header với border trái màu đỏ */}
      <div className="flex items-center gap-3 mb-6 border-l-4 border-red-400 pl-4">
        <span className="text-2xl">💰</span>
        <h2 className="text-xl font-semibold text-blue-600">{t('comparison.title')}</h2>
      </div>

      {/* Người Khác Section - Màu đỏ */}
      <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">❌</span>
          <h3 className="text-lg font-semibold text-red-600">{t('comparison.others')}</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{t('comparison.others.1')}</span>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{t('comparison.others.2')}</span>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{t('comparison.others.3')}</span>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{t('comparison.others.4')}</span>
          </div>
        </div>
      </div>

      {/* Nuôi Tôi Section - Màu xanh */}
      <div className="bg-green-50 border-l-4 border-green-400 p-5 rounded-r-xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">✅</span>
          <h3 className="text-lg font-semibold text-green-600">{t('comparison.me')}</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{t('comparison.me.1')}</span>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{t('comparison.me.2')}</span>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{t('comparison.me.3')}</span>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{t('comparison.me.4')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}