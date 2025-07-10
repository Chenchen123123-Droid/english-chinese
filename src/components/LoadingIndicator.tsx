import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message
}) => {
  const { t } = useLanguage();
  return (
    <div className="text-center py-16">
      <div className="relative mx-auto mb-8">
        <div className="w-20 h-20 border-4 border-purple-600 border-t-red-500 rounded-full animate-spin mx-auto"></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-green-500 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
      </div>
      <p className="text-purple-200 text-lg font-medium">
        {message || t('app.loading')}
        <span className="inline-block ml-2 animate-bounce">🎄</span>
      </p>
      <p className="text-purple-400 text-sm mt-2">{t('app.waitMessage')}</p>
    </div>
  );
};

export default LoadingIndicator; 