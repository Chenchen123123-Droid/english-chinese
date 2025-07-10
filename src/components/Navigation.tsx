import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, Home, Search, HelpCircle, Info, DollarSign, Skull, Ghost } from 'lucide-react';

interface NavigationProps {
  onFAQClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onFAQClick }) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleFAQClick = (e: React.MouseEvent) => {
    if (onFAQClick) {
      e.preventDefault();
      onFAQClick();
    }
  };
  
  const navItems = [
    { name: t('nav.home'), icon: <Home size={18} />, href: '#home' },
    { name: t('nav.search'), icon: <Search size={18} />, href: '#search' },
    { name: t('nav.pricing'), icon: <DollarSign size={18} />, href: '#pricing' },
    { 
      name: t('nav.faq'), 
      icon: <HelpCircle size={18} />, 
      href: '#faq',
      onClick: handleFAQClick
    },
    { name: t('nav.about'), icon: <Info size={18} />, href: '#about' }
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-950/80 to-red-950/80 backdrop-blur-md border-b border-purple-800/30 py-3 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-red-600 rounded-full flex items-center justify-center relative" style={{animation: 'pulse-glow 3s infinite'}}>
              <span className="text-white font-bold">NB</span>
              {/* 添加恐怖元素到Logo */}
              <Skull className="absolute -top-1 -right-1 text-green-600 opacity-80" size={10} />
              <Ghost className="absolute -bottom-1 -left-1 text-red-600 opacity-80" size={10} />
            </div>
            <span className="text-xl font-bold text-purple-100">NameBridge</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                onClick={item.onClick}
                className="nav-link group"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <span>{item.name}</span>
                <span className="nav-link-underline"></span>
              </a>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-purple-200 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden pt-4 pb-6 px-6 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                if (item.onClick) item.onClick(e);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 text-purple-200 hover:text-white py-3 px-4 bg-purple-900/40 rounded-lg hover:bg-purple-800/50 transition-colors duration-300 card-hover"
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation; 