import { Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="relative bg-gradient-to-r from-pink-300 via-pink-200 to-orange-200 rounded-t-[2.5rem]">
      {/* Main header container */}
      <div className="px-12 py-16">
        <div className="text-center">
          {/* Logo container */}
          <div className="inline-block bg-white p-5 rounded-2xl mb-10 shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-orange-200 rounded-2xl flex items-center justify-center">
              <Heart className="w-10 h-10 text-pink-500" fill="currentColor" />
            </div>
          </div>
          
          {/* Title section */}
          <h1 className="text-5xl font-bold mb-12 text-white drop-shadow-lg">
            <span className="text-green-500">🌱</span> {t('header.title')} <span className="text-green-500">🌱</span>
          </h1>
          
          {/* Subtitle container giống hình */}
          <div className="bg-pink-300/70 backdrop-blur-sm rounded-3xl px-12 py-8 mx-auto max-w-2xl shadow-lg">
            <p className="text-2xl font-bold text-white mb-3 drop-shadow">{t('header.subtitle')}</p>
            <p className="text-lg text-white/95 drop-shadow">{t('header.description')}</p>
          </div>
        </div>
      </div>


    </header>
  );
}
