import { Header } from './components/Header';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { FeaturesSection } from './components/FeaturesSection';
import { ComparisonSection } from './components/ComparisonSection';
import { DonationSection } from './components/DonationSection';
import { BudgetSection } from './components/BudgetSection';
import { VideoSection } from './components/VideoSection';
import { Footer } from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-400 to-purple-600 py-6">
        {/* Language Switcher cố định ở góc phải trên */}
        <LanguageSwitcher />
        
        {/* Main container box với bo tròn giống hình */}
        <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
          <Header />
          <main className="px-6 py-6 space-y-6">
            <FeaturesSection />
            <ComparisonSection />
            <DonationSection />
            <BudgetSection />
            <VideoSection />
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}