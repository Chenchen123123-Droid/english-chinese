import React from 'react';
import { Skull } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t } = useLanguage();
  return (
    <header className="text-center mb-12 relative">
      {/* Floating Christmas ornaments with horror twist */}
      <div className="absolute -top-4 left-1/4 w-6 h-6 bg-red-900 rounded-full opacity-70 animate-bounce"></div>
      <div className="absolute -top-2 right-1/3 w-4 h-4 bg-green-900 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-8 left-1/6 w-3 h-3 bg-purple-600 rounded-full opacity-80 animate-bounce" style={{animationDelay: '0.5s'}}></div>
      
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-purple-900 to-purple-800 rounded-full shadow-2xl border-2 border-red-800 relative">
          <Skull className="text-red-400" size={36} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
        </div>
        <div className="relative">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-300 via-red-300 to-green-300 bg-clip-text text-transparent drop-shadow-lg">
            {t('app.title')}
          </h1>
          <div className="absolute -top-2 -right-8 text-red-500 text-sm animate-pulse">🎄</div>
          <p className="text-purple-200 mt-2 font-medium tracking-wide">{t('app.subtitle')}</p>
        </div>
      </div>
      
      <h2 className="text-2xl text-red-300 mb-3 font-semibold">{t('app.title')}</h2>
      <p className="text-purple-300 max-w-2xl mx-auto leading-relaxed">
        {t('app.description')}
        <span className="inline-block ml-2 text-green-400 animate-pulse">✨</span>
      </p>
      
      {/* Decorative elements */}
      <div className="mt-6 flex justify-center space-x-8 text-2xl">
        <span className="animate-bounce text-red-500">🎅</span>
        <span className="animate-pulse text-green-500">🎄</span>
        <span className="animate-bounce text-purple-400" style={{animationDelay: '0.3s'}}>👻</span>
        <span className="animate-pulse text-red-400" style={{animationDelay: '0.6s'}}>🔮</span>
      </div>
    </header>
  );
};

export default Header;