import { useLanguage } from '../contexts/LanguageContext';

export function VideoSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-white">
      {/* Header với border trái màu đỏ */}
      <div className="flex items-center gap-3 mb-4 border-l-8 border-red-500 pl-6 py-2">
        <span className="text-2xl">📹</span>
        <h2 className="text-xl font-semibold text-blue-600">{t('video.title')}</h2>
      </div>

      {/* Description với background hồng nhạt */}
      <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-r-xl mb-6">
        <p className="text-sm text-gray-700 text-center mb-4">
          {t('video.inspiration')}
        </p>
        {/* Video iframe */}
      <div className="relative rounded-xl aspect-video overflow-hidden shadow-lg">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/aBAq6NWlEAk?si=B9pEjOHUDntAlMgQ" 
          title="Tôi nuôi cô - Châu Tinh Trì" 
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
          className="rounded-xl"
        ></iframe>
      </div>
      </div>

      
    </section>
  );
}
