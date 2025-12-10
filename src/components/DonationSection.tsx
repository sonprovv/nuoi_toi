import { useLanguage } from '../contexts/LanguageContext';

export function DonationSection() {
  const { t } = useLanguage();
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
          href="https://buymeacoffee.com/nuoitoi.com" 
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://buymeacoffee.com/nuoitoi.com
        </a>
      </p>
      
      {/* QR Code */}
      <div className="bg-white p-6 rounded-2xl inline-block mb-6 shadow-lg">
        <img 
          src="/public/img.png" 
          alt="QR Code để donate" 
          className="w-48 h-48 rounded-xl object-cover"
        />
      </div>
      
      {/* Transfer note */}
      <p className="text-sm text-red-500 mb-6 font-medium">
        {t('donation.transfer')}
      </p>
      
      {/* CTA Button */}
      <button className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg">
        {t('donation.button')}
      </button>
    </section>
  );
}
