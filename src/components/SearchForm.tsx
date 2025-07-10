import React, { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchFormProps {
  onSubmit: (name: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, isLoading }) => {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      setError(t('app.nameRequired'));
      return;
    }

    setError('');
    onSubmit(inputValue.trim());
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-purple-400 group-focus-within:text-red-400 transition-colors duration-300" />
          </div>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError('');
            }}
            placeholder={t('app.enterName')}
            className="w-full pl-14 pr-6 py-5 text-lg bg-purple-900/50 border-2 border-purple-700 rounded-2xl focus:ring-4 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 shadow-2xl text-purple-100 placeholder-purple-400 backdrop-blur-sm"
          />
          
          {/* Magical glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 to-red-600/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-red-300 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              {error}
            </p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-800 via-red-800 to-purple-800 hover:from-purple-700 hover:via-red-700 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-red-700/50 relative overflow-hidden group"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative flex items-center gap-3">
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-purple-300 border-t-red-400 rounded-full animate-spin"></div>
            ) : (
              <Zap size={24} className="text-yellow-400 animate-pulse" />
            )}
            <span className="text-lg">
              {isLoading ? t('app.loading') : `🎄 ${t('app.generate')} 🎄`}
            </span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default SearchForm;