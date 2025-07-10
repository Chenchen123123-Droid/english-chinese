import React, { useState } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="relative z-50">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/60 to-purple-800/60 rounded-lg hover:from-purple-800/80 hover:to-purple-700/80 transition-all duration-300 text-purple-200 hover:text-white border border-purple-700/50"
        aria-label="Select language"
      >
        <Globe size={16} className="text-purple-300" />
        <span>{currentLanguage?.flag}</span>
        <span className="hidden md:inline">{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-purple-900/90 border border-purple-700 rounded-lg shadow-xl backdrop-blur-md w-48 overflow-hidden">
          <div className="py-2">
            <p className="px-4 py-2 text-sm text-purple-300 border-b border-purple-700/50">
              {t('app.language')}
            </p>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-purple-800/80 transition-colors duration-200 ${
                  language === lang.code ? 'bg-purple-800/50 text-white' : 'text-purple-200'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 