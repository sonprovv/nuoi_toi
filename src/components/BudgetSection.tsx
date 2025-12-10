import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function BudgetSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-white">
      {/* Header với border trái màu đỏ */}
      <div className="flex items-center gap-3 mb-6 border-l-8 border-red-500 pl-6 py-2">
        <span className="text-2xl">📝</span>
        <h2 className="text-xl font-semibold text-blue-600">{t('budget.title')}</h2>
      </div>

      {/* Budget breakdown với background xanh nhạt */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-xl mb-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-blue-600">40%</span>
              <span className="text-gray-700 ml-2">{t('budget.food')}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-blue-600">20%</span>
              <span className="text-gray-700 ml-2">{t('budget.utilities')}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-blue-600">15%</span>
              <span className="text-gray-700 ml-2">{t('budget.rent')}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-blue-600">10%</span>
              <span className="text-gray-700 ml-2">{t('budget.health')}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-blue-600">10%</span>
              <span className="text-gray-700 ml-2">{t('budget.education')}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-blue-600">5%</span>
              <span className="text-gray-700 ml-2">{t('budget.entertainment')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center">
        <p className="text-sm text-red-500 font-medium">
          {t('budget.chart')}
        </p>
      </div>
    </section>
  );
}
