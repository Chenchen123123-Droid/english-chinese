import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SearchForm from './components/SearchForm';
import ResultsGrid from './components/ResultsGrid';
import LoadingIndicator from './components/LoadingIndicator';
import LanguageSwitcher from './components/LanguageSwitcher';
import FAQ from './components/FAQ';
import FAQPage from './components/FAQPage';
import PricingPlans from './components/PricingPlans';
import PurpleRippleEffect from './components/PurpleRippleEffect';
import namesData from './data/names.json';
import { generateChineseNames } from './services/deepseekApi';
import { useLanguage } from './contexts/LanguageContext';
import { Skull, Ghost, Snowflake } from 'lucide-react';

interface ChineseName {
  name: string;
  type: string;
  meaning: string;
}

interface NamesData {
  [key: string]: ChineseName[];
}

function App() {
  const { t } = useLanguage();
  const [results, setResults] = useState<ChineseName[]>([]);
  const [inputName, setInputName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedName, setCopiedName] = useState('');
  const [currentPage, setCurrentPage] = useState('home');

  const handleSearch = async (name: string) => {
    setIsLoading(true);
    setInputName(name);
    
    try {
      // 首先检查本地数据中是否已有此名字
      const data = namesData as NamesData;
      let foundResults = data[name] || [];
      
      // 如果本地数据没有，则使用DeepSeek API生成
      if (foundResults.length === 0) {
        foundResults = await generateChineseNames(name);
      }
      
      setResults(foundResults);
    } catch (error) {
      console.error('生成名字时出错:', error);
      // 如果API调用失败，尝试使用本地数据
      const data = namesData as NamesData;
      const fallbackResults = data[name] || [];
      setResults(fallbackResults);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(''), 3000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = name;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedName(name);
      setTimeout(() => setCopiedName(''), 3000);
    }
  };

  const navigateToFAQ = () => {
    setCurrentPage('faq');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'faq') {
    return <FAQPage onBackClick={navigateToHome} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-red-950 relative overflow-hidden">
      {/* Mouse movement purple ripple effect */}
      <PurpleRippleEffect />
      
      {/* 恐怖圣诞元素 - 左上角 */}
      <div className="absolute top-16 left-4 w-32 h-32 pointer-events-none z-10">
        <div className="relative w-full h-full">
          <Ghost className="absolute top-0 left-0 text-red-600 opacity-80 animate-float" size={42} />
          <Skull className="absolute top-10 left-14 text-green-700 opacity-70" size={36} />
          <div className="absolute top-24 left-6 w-8 h-8 bg-red-900/60 rounded-full shadow-lg shadow-red-900/50"></div>
          <Snowflake className="absolute top-5 left-24 text-purple-400 animate-spin" style={{animationDuration: '8s'}} size={24} />
        </div>
      </div>
      
      {/* 恐怖圣诞元素 - 右上角 */}
      <div className="absolute top-16 right-4 w-32 h-32 pointer-events-none z-10">
        <div className="relative w-full h-full">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-800 to-purple-900 rounded-full opacity-70 shadow-lg shadow-red-900/50"></div>
          <Skull className="absolute top-2 right-2 text-green-600 animate-pulse" size={32} />
          <Ghost className="absolute top-16 right-12 text-purple-500 opacity-80" size={24} />
          <Snowflake className="absolute top-20 right-4 text-red-400 animate-bounce" size={18} />
          <div className="absolute top-8 right-20 w-4 h-4 bg-green-800 rounded-full shadow-md shadow-green-900/50 animate-ping" style={{animationDuration: '4s'}}></div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-red-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-70"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-green-500 rounded-full animate-pulse opacity-60" style={{animationDelay: '0.5s'}}></div>
        
        {/* 添加更多恐怖圣诞元素 */}
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-red-700 rounded-full animate-pulse opacity-60" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-green-800 rounded-full animate-ping opacity-40" style={{animationDelay: '0.7s'}}></div>
        <div className="absolute bottom-1/2 left-3/4 w-5 h-5 bg-purple-800 rounded-full animate-bounce opacity-30" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Navigation Bar */}
      <Navigation onFAQClick={navigateToFAQ} />
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 right-6 z-20">
        <LanguageSwitcher />
      </div>
      
      <div id="home" className="container mx-auto px-6 py-16 relative z-10">
        <Header />
        
        <div id="search">
          <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
        </div>
        
        {isLoading && (
          <LoadingIndicator />
        )}
        
        {!isLoading && inputName && (
          <ResultsGrid
            results={results}
            inputName={inputName}
            onCopy={handleCopy}
            copiedName={copiedName}
          />
        )}
        
        {!inputName && !isLoading && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-800 to-red-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-purple-600/50 relative">
              <span className="text-5xl animate-pulse">🎅</span>
              {/* 添加恐怖元素 */}
              <Skull className="absolute -top-4 -right-2 text-green-600 animate-pulse" size={24} />
              <Ghost className="absolute -bottom-2 -left-4 text-red-500 opacity-80 animate-bounce" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-purple-200 mb-4">{t('app.start')}</h3>
            <p className="text-purple-300 mb-12 max-w-lg mx-auto">
              {t('app.startDescription')}
              <span className="inline-block ml-2 animate-bounce">✨</span>
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {['Michael', 'Sarah', 'David', 'Emma', 'John'].map((name) => (
                <button
                  key={name}
                  onClick={() => handleSearch(name)}
                  className="px-6 py-4 bg-gradient-to-r from-purple-800/60 to-red-800/60 border-2 border-purple-600/50 rounded-xl hover:from-purple-700/80 hover:to-red-700/80 transition-all duration-300 text-purple-200 hover:text-white font-medium shadow-lg hover:shadow-red-500/20 backdrop-blur-sm relative group"
                >
                  <span className="group-hover:scale-110 transition-all duration-300">🎁 {t('app.try')} {name}</span>
                  {/* 圣诞装饰 */}
                  {Math.random() > 0.5 && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-600 rounded-full opacity-70 group-hover:animate-ping"></div>
                  )}
                  {Math.random() > 0.5 && (
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-600 rounded-full opacity-70 group-hover:animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Pricing Plans Section - Added before FAQ */}
      <div id="pricing" className="container mx-auto px-6 relative z-10">
        <PricingPlans />
      </div>
      
      {/* FAQ Section with "查看更多" button */}
      <div id="faq" className="container mx-auto px-6 relative z-10">
        <div className="w-full py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-purple-100 mb-2 flex items-center justify-center gap-2">
              <Skull className="text-red-500" size={28} />
              {t('app.faq.title')}
              <Ghost className="text-green-500" size={28} />
            </h2>
            <p className="text-center text-purple-300 mb-8">{t('app.faq.subtitle') || '常见问题与解答'}</p>
            
            {/* 预览两个常见问题 */}
            <div className="bg-gradient-to-br from-purple-900/70 to-purple-800/70 rounded-2xl overflow-hidden shadow-2xl border border-purple-700/50 backdrop-blur-sm mb-8">
              <div className="border-b border-purple-700/30">
                <div className="py-5 px-4">
                  <h3 className="text-lg font-medium text-purple-100">{t('app.faq.q1')}</h3>
                  <p className="mt-2 text-purple-300">{t('app.faq.a1')}</p>
                </div>
              </div>
              <div>
                <div className="py-5 px-4">
                  <h3 className="text-lg font-medium text-purple-100">{t('app.faq.q2')}</h3>
                  <p className="mt-2 text-purple-300">{t('app.faq.a2')}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={navigateToFAQ}
                className="px-6 py-3 bg-gradient-to-r from-purple-700/60 to-red-700/60 rounded-lg text-white font-medium hover:from-purple-600/80 hover:to-red-600/80 transition-colors duration-300 shadow-lg shadow-purple-700/20 flex items-center gap-2"
              >
                <span>查看更多常见问题</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div id="about" className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-100 mb-8 flex items-center justify-center gap-2">
            <Ghost className="text-green-500" size={24} />
            {t('app.about.title') || 'About NameBridge'}
            <Skull className="text-red-500" size={24} />
          </h2>
          <div className="bg-gradient-to-br from-purple-900/70 to-purple-800/70 rounded-2xl p-8 shadow-2xl border border-purple-700/50 backdrop-blur-sm relative overflow-hidden">
            {/* 恐怖圣诞装饰 */}
            <div className="absolute -top-4 -right-4 w-24 h-24 opacity-20 pointer-events-none">
              <Snowflake className="absolute top-8 right-8 text-white animate-spin" style={{animationDuration: '15s'}} size={48} />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 opacity-20 pointer-events-none">
              <Ghost className="absolute bottom-8 left-8 text-white animate-float" size={48} />
            </div>
            
            <p className="text-purple-200 mb-4 relative z-10">
              {t('app.about.description') || 'NameBridge is a tool designed to help bridge cultural gaps through names. Our platform uses advanced AI to generate culturally appropriate Chinese names for English names and vice versa.'}
            </p>
            <p className="text-purple-200 mb-4 relative z-10">
              {t('app.about.mission') || 'Our mission is to promote cultural understanding and help people connect across languages and cultures through the power of meaningful names.'}
            </p>
            <div className="flex justify-center mt-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-red-600 rounded-full flex items-center justify-center relative">
                <span className="text-white text-3xl">NB</span>
                <Skull className="absolute -top-2 -right-2 text-purple-800" size={16} />
                <Ghost className="absolute -bottom-2 -left-2 text-red-800" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-purple-950/80 to-red-950/80 border-t-2 border-purple-800/50 py-12 mt-12 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <p className="text-purple-200 mb-4 text-lg">
            © 2025 NameBridge. {t('app.footer.copyright')}
            <span className="inline-block ml-2 animate-pulse">🎄</span>
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-purple-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              {t('app.footer.feature1')}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {t('app.footer.feature2')}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              {t('app.footer.feature3')}
            </span>
          </div>
          
          {/* Contact email in footer */}
          <div className="mt-6 text-purple-400">
            <a href="mailto:y206186.gmail.com" className="hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>y206186.gmail.com</span>
            </a>
          </div>
          
          {/* Christmas decorations in footer */}
          <div className="flex justify-center space-x-6 mt-6 text-2xl">
            <span className="animate-bounce text-red-400">🎁</span>
            <span className="animate-pulse text-green-400">🎄</span>
            <span className="animate-bounce text-purple-400" style={{animationDelay: '0.3s'}}>👻</span>
            <span className="animate-pulse text-yellow-400" style={{animationDelay: '0.6s'}}>⭐</span>
            <span className="animate-bounce text-red-500" style={{animationDelay: '0.9s'}}>🔮</span>
            <Skull className="text-green-400 animate-pulse" size={24} />
            <Ghost className="text-red-400 animate-float" size={24} />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;