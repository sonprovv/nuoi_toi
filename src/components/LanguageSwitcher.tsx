import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type Language = 'vi' | 'en' | 'fr' | 'dk' | 'jp' | 'cn' | 'ru';

export function LanguageSwitcher() {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { currentLang, setCurrentLang } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'vi', label: 'Tiếng Việt', flag: 'VN' },
    { code: 'en', label: 'English', flag: 'GB' },
    { code: 'fr', label: 'Français', flag: 'FR' },
    { code: 'dk', label: 'Dansk', flag: 'DK' },
    { code: 'jp', label: '日本語', flag: 'JP' },
    { code: 'cn', label: '中文', flag: 'CN' },
    { code: 'ru', label: 'Русский', flag: 'RU' },
  ];

  return (
    <div className="fixed top-6 right-6 z-50">
      {/* Language Switcher button */}
      <button
        onClick={() => setLangMenuOpen(!langMenuOpen)}
        className="bg-white text-indigo-600 p-3 rounded-2xl shadow-lg hover:bg-indigo-50 transition-all duration-200"
      >
        <Globe className="w-6 h-6" />
      </button>

      {/* Language dropdown */}
      {langMenuOpen && (
        <div className="absolute top-16 right-0 bg-white rounded-2xl shadow-2xl p-3 w-52 border border-gray-100">
          <div className="flex flex-col gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setCurrentLang(lang.code);
                  setLangMenuOpen(false);
                }}
                className={`text-sm px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  currentLang === lang.code
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <span className="text-xs font-bold mr-2">{lang.flag}</span> {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}