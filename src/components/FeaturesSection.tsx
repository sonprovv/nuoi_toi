import { BarChart3, Search, Gem, Calculator, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function FeaturesSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-white">
      {/* Header với border trái màu đỏ */}
      <div className="flex items-center gap-3 mb-6 border-l-4 border-red-400 pl-5">
        <span className="text-2xl">🎯</span>
        <h2 className="text-xl font-semibold text-blue-600">{t('features.title')}</h2>
      </div>

      {/* Grid 4 features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-gray-50 rounded-xl cursor-pointer transition-all duration-300 hover:bg-blue-50 hover:shadow-lg hover:border-2 hover:border-blue-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-300 hover:bg-blue-200">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-sm font-semibold text-purple-600 mb-2 transition-colors duration-300 hover:text-blue-700">{t('features.realtime.title')}</h3>
          <p className="text-xs text-gray-600 leading-relaxed transition-colors duration-300 hover:text-gray-800">
            {t('features.realtime.desc')}
          </p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl cursor-pointer transition-all duration-300 hover:bg-blue-50 hover:shadow-lg hover:border-2 hover:border-blue-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-300 hover:bg-blue-200">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-sm font-semibold text-purple-600 mb-2 transition-colors duration-300 hover:text-blue-700">{t('features.transparent.title')}</h3>
          <p className="text-xs text-gray-600 leading-relaxed transition-colors duration-300 hover:text-gray-800">
            {t('features.transparent.desc')}
          </p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl cursor-pointer transition-all duration-300 hover:bg-green-50 hover:shadow-lg hover:border-2 hover:border-green-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-300 hover:bg-green-200">
            <Gem className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-sm font-semibold text-purple-600 mb-2 transition-colors duration-300 hover:text-green-700">{t('features.spending.title')}</h3>
          <p className="text-xs text-gray-600 leading-relaxed transition-colors duration-300 hover:text-gray-800">
            {t('features.spending.desc')}
          </p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl cursor-pointer transition-all duration-300 hover:bg-purple-50 hover:shadow-lg hover:border-2 hover:border-purple-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-300 hover:bg-purple-200">
            <Calculator className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-sm font-semibold text-purple-600 mb-2 transition-colors duration-300 hover:text-purple-700">{t('features.tracking.title')}</h3>
          <p className="text-xs text-gray-600 leading-relaxed transition-colors duration-300 hover:text-gray-800">
            {t('features.tracking.desc')}
          </p>
        </div>
      </div>

      {/* Cam Kết Vàng section */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-8 rounded-r-xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🏠</span>
          <h3 className="text-lg font-semibold text-yellow-700">{t('commitment.title')}</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-800">{t('commitment.daily')}</span>
              <span className="text-gray-700 ml-1">{t('commitment.daily.desc')}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-800">{t('commitment.transparent')}</span>
              <span className="text-gray-700 ml-1">{t('commitment.transparent.desc')}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-800">{t('commitment.receipt')}</span>
              <span className="text-gray-700 ml-1">{t('commitment.receipt.desc')}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-800">{t('commitment.video')}</span>
              <span className="text-gray-700 ml-1">{t('commitment.video.desc')}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-800">{t('commitment.hotline')}</span>
              <span className="text-gray-700 ml-1">{t('commitment.hotline.desc')}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-gray-800">{t('commitment.noblock')}</span>
              <span className="text-gray-700 ml-1">{t('commitment.noblock.desc')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
