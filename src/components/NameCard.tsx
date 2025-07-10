import React from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NameCardProps {
  name: string;
  name_en?: string;
  type: string;
  type_en?: string;
  meaning: string;
  meaning_en?: string;
  onCopy: (name: string) => void;
  isCopied: boolean;
}

const NameCard: React.FC<NameCardProps> = ({ 
  name, 
  name_en = "", 
  type, 
  type_en = "", 
  meaning, 
  meaning_en = "", 
  onCopy, 
  isCopied 
}) => {
  const { t } = useLanguage();
  return (
    <div className="bg-gradient-to-br from-purple-900/80 to-purple-800/60 rounded-2xl shadow-2xl border-2 border-purple-700/50 p-6 hover:shadow-red-500/20 transition-all duration-500 group backdrop-blur-sm relative overflow-hidden">
      {/* Magical sparkle effects */}
      <div className="absolute top-2 right-2 text-yellow-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles size={16} className="animate-pulse" />
      </div>
      
      {/* Christmas ornament decoration */}
      <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-600 rounded-full opacity-70 animate-bounce"></div>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-600 rounded-full opacity-60 animate-pulse"></div>
      
      <div className="space-y-5 relative">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-red-200 bg-clip-text text-transparent drop-shadow-lg">
              {name}
            </h3>
            {name_en && (
              <p className="text-sm text-purple-300 mt-1">
                {name_en}
              </p>
            )}
          </div>
          <div>
            <span className="px-4 py-2 bg-gradient-to-r from-red-800/60 to-purple-800/60 text-green-300 rounded-full text-sm font-bold border border-red-600/30 shadow-lg">
              {type}
            </span>
            {type_en && (
              <p className="text-xs text-purple-400 mt-1 text-center">
                {type_en}
              </p>
            )}
          </div>
        </div>
        
        <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
          <p className="text-purple-200 text-sm leading-relaxed mb-2">
            {meaning}
          </p>
          {meaning_en && (
            <p className="text-purple-400 text-xs italic leading-relaxed border-t border-purple-700/50 pt-2 mt-2">
              {meaning_en}
            </p>
          )}
        </div>
        
        <button
          onClick={() => onCopy(name)}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-red-800/60 to-purple-800/60 hover:from-red-700/80 hover:to-purple-700/80 text-purple-100 hover:text-white rounded-xl transition-all duration-300 group-hover:shadow-lg border border-red-700/40 relative overflow-hidden"
        >
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-red-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative flex items-center gap-3">
            {isCopied ? (
              <Check size={18} className="text-green-400" />
            ) : (
              <Copy size={18} className="text-purple-300" />
            )}
            <span className="font-semibold">
              {isCopied ? `✨ ${t('app.copied')}` : `🎁 ${t('app.copy')}`}
            </span>
          </div>
        </button>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default NameCard;