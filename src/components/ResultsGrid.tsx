import React from 'react';
import NameCard from './NameCard';
import { useLanguage } from '../contexts/LanguageContext';

interface ChineseName {
  name: string;
  name_en?: string;
  type: string;
  type_en?: string;
  meaning: string;
  meaning_en?: string;
}

interface ResultsGridProps {
  results: ChineseName[];
  inputName: string;
  onCopy: (name: string) => void;
  copiedName: string;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, inputName, onCopy, copiedName }) => {
  const { t } = useLanguage();
  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-800 to-red-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-purple-600/50">
          <span className="text-4xl animate-bounce">👻</span>
        </div>
        <h3 className="text-2xl font-bold text-purple-200 mb-4">{t('app.notFound')}</h3>
        <p className="text-purple-300 max-w-md mx-auto">
          {t('app.notFoundDesc')} <span className="font-bold text-red-300">{inputName}</span>
          <br />
          <span className="text-sm text-purple-400 mt-2 block">{t('app.tryAgain')} 🎄</span>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4">
          <span className="text-purple-200">{t('app.namesFor')} </span>
          <span className="bg-gradient-to-r from-red-300 to-green-300 bg-clip-text text-transparent">{inputName}</span>
        </h3>
        <p className="text-purple-300 text-lg">
          {t('app.chooseYourFavorite')}
          <span className="inline-block ml-2 animate-pulse">🎅</span>
        </p>
        
        {/* Decorative Christmas elements */}
        <div className="flex justify-center space-x-4 mt-6 text-xl">
          <span className="animate-bounce text-red-400">🎁</span>
          <span className="animate-pulse text-green-400">⭐</span>
          <span className="animate-bounce text-purple-400" style={{animationDelay: '0.2s'}}>🔮</span>
          <span className="animate-pulse text-red-400" style={{animationDelay: '0.4s'}}>🎄</span>
          <span className="animate-bounce text-yellow-400" style={{animationDelay: '0.6s'}}>✨</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((result, index) => (
          <div
            key={index}
            className="transform hover:scale-105 transition-transform duration-300"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <NameCard
              name={result.name}
              name_en={result.name_en}
              type={result.type}
              type_en={result.type_en}
              meaning={result.meaning}
              meaning_en={result.meaning_en}
              onCopy={onCopy}
              isCopied={copiedName === result.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsGrid;