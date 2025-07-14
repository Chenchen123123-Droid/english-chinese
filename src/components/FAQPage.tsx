import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, ChevronUp, Mail, Skull, Ghost, Snowflake } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getAnimationDelay = () => {
    return `${index * 0.1}s`;
  };

  return (
    <div 
      className="border-b border-purple-700/30 last:border-b-0 card-hover"
      style={{
        animationDelay: getAnimationDelay(),
        transitionDelay: getAnimationDelay()
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 px-4 text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-purple-100 group-hover:text-white transition-colors">{question}</h3>
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-purple-800/50' : 'bg-transparent'}`}>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-purple-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-purple-400" />
          )}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pb-5 pt-2">
          <p className="text-purple-300">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQPage: React.FC<{onNavigate: (page: string) => void}> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const faqItems = [
    { 
      question: t('app.faq.q1'), 
      answer: t('app.faq.a1')
    },
    { 
      question: t('app.faq.q2'), 
      answer: t('app.faq.a2')
    },
    { 
      question: t('app.faq.q3'), 
      answer: t('app.faq.a3')
    },
    { 
      question: t('app.faq.q4'), 
      answer: t('app.faq.a4')
    },
    { 
      question: t('app.faq.q5') || '如何联系客服？', 
      answer: t('app.faq.a5') || '您可以通过下方提供的电子邮件与我们联系，我们会尽快回复您的问题。'
    },
    {
      question: '圣诞节版本有什么特别之处？',
      answer: '我们的圣诞节版本融合了传统圣诞元素和恐怖元素，创造了独特的视觉体验。同时，我们还为此版本特别优化了名字生成算法，能够生成更加符合节日气氛的名字建议。'
    },
    {
      question: '为什么选择恐怖圣诞主题？',
      answer: '我们希望通过恐怖圣诞主题，为传统的圣诞节增添一丝黑暗奇幻的气氛。这种反差不仅能够吸引用户的注意力，也能为用户提供一种独特的体验，打破常规的名字生成服务。'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-red-950 relative overflow-hidden">
      {/* 恐怖圣诞元素 - 左上角 */}
      <div className="absolute top-4 left-4 w-32 h-32 pointer-events-none z-10">
        <div className="relative w-full h-full">
          <Ghost className="absolute top-0 left-0 text-red-600 opacity-80 animate-float" size={42} />
          <Skull className="absolute top-10 left-14 text-green-700 opacity-70" size={36} />
          <div className="absolute top-24 left-6 w-8 h-8 bg-red-900/60 rounded-full shadow-lg shadow-red-900/50"></div>
          <Snowflake className="absolute top-5 left-24 text-purple-400 animate-spin" style={{animationDuration: '8s'}} size={24} />
        </div>
      </div>
      
      {/* 恐怖圣诞元素 - 右上角 */}
      <div className="absolute top-4 right-4 w-32 h-32 pointer-events-none z-10">
        <div className="relative w-full h-full">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-800 to-purple-900 rounded-full opacity-70 shadow-lg shadow-red-900/50"></div>
          <Skull className="absolute top-2 right-2 text-green-600 animate-pulse" size={32} />
          <Ghost className="absolute top-16 right-12 text-purple-500 opacity-80" size={24} />
          <Snowflake className="absolute top-20 right-4 text-red-400 animate-bounce" size={18} />
          <div className="absolute top-8 right-20 w-4 h-4 bg-green-800 rounded-full shadow-md shadow-green-900/50 animate-ping" style={{animationDuration: '4s'}}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => onNavigate('home')}
            className="px-4 py-2 bg-gradient-to-r from-purple-800/70 to-purple-700/70 rounded-lg flex items-center gap-2 text-purple-100 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            返回首页
          </button>
          
          <div className="flex items-center">
            <Skull className="text-red-500 mr-2" size={24} />
            <h1 className="text-2xl font-bold text-purple-100">恐怖圣诞 FAQ</h1>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-100 mb-2">
            {t('app.faq.title')}
          </h2>
          <p className="text-center text-purple-300 mb-8">{t('app.faq.subtitle') || '常见问题与解答'}</p>
          
          {/* 恐怖圣诞装饰 */}
          <div className="flex justify-center space-x-6 my-8 text-3xl">
            <span className="animate-float text-red-500">🎅</span>
            <span className="animate-pulse text-green-500">🎄</span>
            <Skull className="text-purple-400 animate-pulse" size={32} />
            <span className="animate-float text-red-400" style={{animationDelay: '0.3s'}}>👻</span>
            <span className="animate-pulse text-yellow-400" style={{animationDelay: '0.6s'}}>⭐</span>
            <Ghost className="text-red-500 animate-bounce" style={{animationDelay: '0.9s'}} size={32} />
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/70 to-purple-800/70 rounded-2xl overflow-hidden shadow-2xl border border-purple-700/50 backdrop-blur-sm">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </div>
          
          <div className="flex flex-col items-center mt-10 bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 border border-purple-700/30 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-red-700 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-medium text-purple-100 mb-2">
              {t('app.faq.contactTitle') || '有其他问题?'}
            </h3>
            <p className="text-purple-300 text-center mb-4">
              {t('app.faq.contactDesc') || '请随时联系我们，我们将尽快回复您的咨询。'}
            </p>
            <a 
              href="mailto:y206186.gmail.com" 
              className="px-5 py-2 bg-gradient-to-r from-purple-700/60 to-purple-600/60 rounded-lg text-purple-100 hover:text-white flex items-center gap-2 hover:from-purple-600/80 hover:to-purple-500/80 transition-all duration-300 group"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              <span>y206186.gmail.com</span>
            </a>
          </div>
          
          {/* 底部恐怖圣诞装饰 */}
          <div className="mt-12 border-t border-purple-700/30 pt-8">
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-900 to-red-800 rounded-full flex items-center justify-center shadow-lg shadow-red-900/30">
                  <Skull className="text-white" size={32} />
                </div>
                <p className="text-sm text-purple-300 mt-2 text-center">恐怖圣诞老人</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-900 to-green-800 rounded-full flex items-center justify-center shadow-lg shadow-green-900/30">
                  <Ghost className="text-white" size={32} />
                </div>
                <p className="text-sm text-purple-300 mt-2 text-center">圣诞幽灵</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-900 to-purple-800 rounded-full flex items-center justify-center shadow-lg shadow-purple-900/30">
                  <Snowflake className="text-white" size={32} />
                </div>
                <p className="text-sm text-purple-300 mt-2 text-center">魔法雪花</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 