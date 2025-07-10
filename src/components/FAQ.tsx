import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // 交错动画延迟
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

const FAQ: React.FC = () => {
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
  ];

  return (
    <section className="w-full py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-100 mb-2">
          {t('app.faq.title')}
        </h2>
        <p className="text-center text-purple-300 mb-8">{t('app.faq.subtitle') || '常见问题与解答'}</p>
        
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
      </div>
    </section>
  );
};

export default FAQ; 