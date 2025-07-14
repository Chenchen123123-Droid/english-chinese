import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, Home, Search, HelpCircle, Info, DollarSign, Skull, Ghost } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleNavClick = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };
  
  const navItems = [
    { 
      name: t('nav.home') || 'Home', 
      icon: <Home size={18} />, 
      page: 'home' 
    },
    { 
      name: t('nav.pricing') || 'Pricing', 
      icon: <DollarSign size={18} />, 
      page: 'pricing' 
    },
    { 
      name: t('nav.faq') || 'FAQ', 
      icon: <HelpCircle size={18} />, 
      page: 'faq'
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-950/80 to-red-950/80 backdrop-blur-md border-b border-purple-800/30 py-3 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={(e) => handleNavClick('home', e)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-red-600 rounded-full flex items-center justify-center relative" style={{animation: 'pulse-glow 3s infinite'}}>
              <span className="text-white font-bold">NB</span>
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
                href="#"
                onClick={(e) => handleNavClick(item.page, e)}
                className={`nav-link group ${currentPage === item.page ? 'text-red-300' : 'text-purple-200'}`}
              >
                <span className="group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <span>{item.name}</span>
                <span className={`nav-link-underline ${currentPage === item.page ? 'bg-red-400' : 'bg-purple-500'}`}></span>
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
              href="#"
              onClick={(e) => handleNavClick(item.page, e)}
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors duration-300 card-hover ${
                currentPage === item.page 
                ? 'bg-purple-700/60 text-red-300' 
                : 'bg-purple-900/40 text-purple-200 hover:text-white hover:bg-purple-800/50'
              }`}
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