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
import Fireworks from './components/Fireworks';
import namesData from './data/names.json';
import { generateChineseNames } from './services/deepseekApi';
import { useLanguage } from './contexts/LanguageContext';
import { Skull, Ghost, Snowflake } from 'lucide-react';

interface ChineseName {
  name: string;
  name_en?: string;
  type: string;
  type_en?: string;
  meaning: string;
  meaning_en?: string;
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
  const [showFireworks, setShowFireworks] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (name: string) => {
    setIsLoading(true);
    setInputName(name);
    setErrorMessage(''); // 清除之前的错误消息
    
    try {
      // 首先检查本地数据中是否已有此名字
      const data = namesData as NamesData;
      let foundResults = data[name] || [];
      
      // 如果本地数据没有，则使用DeepSeek API生成
      if (foundResults.length === 0) {
        console.log('本地数据库中没有找到名字，尝试使用API生成...');
        foundResults = await generateChineseNames(name);
        
        // 检查API返回结果
        if (foundResults.length === 0) {
          console.log('API返回空结果');
          setErrorMessage(t('app.apiError'));
        } else if (foundResults.length === 1 && 
                  (foundResults[0].type === '错误' || foundResults[0].type_en === 'Error')) {
          console.log('API返回错误信息', foundResults[0]);
          setErrorMessage(foundResults[0].meaning);
        }
      }
      
      setResults(foundResults);
      
      // 只在成功生成名字时显示烟花效果
      if (foundResults.length > 0 && foundResults[0].type !== '错误' && foundResults[0].type_en !== 'Error') {
        setShowFireworks(true);
        setTimeout(() => {
          setShowFireworks(false);
        }, 5000);
      }
    } catch (error) {
      console.error('生成名字时出错:', error);
      setErrorMessage(t('app.generateError'));
      
      // 如果API调用失败，尝试使用本地数据
      const data = namesData as NamesData;
      const fallbackResults = data[name] || [];
      setResults(fallbackResults);
      
      // 只在有回退结果时显示烟花效果
      if (fallbackResults.length > 0) {
        setShowFireworks(true);
        setTimeout(() => {
          setShowFireworks(false);
        }, 5000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyName = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(''), 2000);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Header />
            <PurpleRippleEffect />
            
            <div className="container mx-auto px-4 py-8">
              <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
              
              {isLoading && (
                <div className="flex flex-col items-center justify-center my-12">
                  <LoadingIndicator />
                  <p className="mt-4 text-purple-300 text-center">{t('app.waitMessage')}</p>
                </div>
              )}
              
              {errorMessage && !isLoading && (
                <div className="max-w-2xl mx-auto my-8 p-4 bg-red-900/30 border border-red-700 rounded-lg text-center">
                  <p className="text-red-200">{errorMessage}</p>
                  <p className="text-red-300 text-sm mt-2">{t('app.tryAgain')}</p>
                </div>
              )}
              
              {!isLoading && results.length > 0 && (
                <ResultsGrid 
                  results={results} 
                  inputName={inputName}
                  copiedName={copiedName}
                  onCopyName={handleCopyName}
                />
              )}
              
              {!isLoading && results.length === 0 && inputName && !errorMessage && (
                <div className="text-center my-12 p-6 bg-purple-900/30 border-2 border-purple-700 rounded-2xl max-w-xl mx-auto">
                  <Ghost className="w-12 h-12 mx-auto text-purple-400 mb-3" />
                  <h3 className="text-2xl font-bold text-purple-100 mb-2">{t('app.notFound')}</h3>
                  <p className="text-purple-300 mb-1">{t('app.notFoundDesc')} <span className="font-bold text-red-300">{inputName}</span></p>
                  <p className="text-purple-400">{t('app.tryAgain')}</p>
                </div>
              )}
            </div>
          </>
        );
        
      case 'faq':
        return <FAQPage onNavigate={handleNavigation} />;
        
      case 'pricing':
        return <PricingPlans />;
        
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-gray-900 to-gray-900 pointer-events-none"></div>
      
      <div className="relative z-10">
        <Navigation currentPage={currentPage} onNavigate={handleNavigation} />
        
        {renderPage()}
        
        <div className="fixed bottom-8 right-8 z-50">
          <LanguageSwitcher />
        </div>
        
        {showFireworks && <Fireworks />}
      </div>
    </div>
  );
}

export default App;