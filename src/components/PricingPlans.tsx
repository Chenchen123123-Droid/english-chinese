import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Check } from 'lucide-react';

interface PricingPlanProps {
  title: string;
  price: string;
  duration: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  price,
  duration,
  features,
  isPopular = false,
  buttonText
}) => {
  return (
    <div 
      className={`rounded-2xl overflow-hidden card-hover ${
        isPopular 
          ? 'bg-gradient-to-br from-purple-800/80 to-purple-700/80 border-2 border-purple-500/70 transform scale-105 shadow-xl shadow-purple-500/20' 
          : 'bg-gradient-to-br from-purple-900/70 to-purple-800/70 border border-purple-700/50'
      }`}
    >
      {isPopular && (
        <div className="bg-gradient-to-r from-purple-600 to-red-500 text-white text-center py-1 text-sm font-medium">
          最受欢迎
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-purple-100 mb-2">{title}</h3>
        <div className="flex items-baseline mb-6">
          <span className="text-3xl font-bold text-white">${price}</span>
          <span className="text-purple-300 ml-1">/{duration}</span>
        </div>
        <ul className="mb-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check size={18} className="text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-purple-200 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
          isPopular 
            ? 'bg-gradient-to-r from-purple-600 to-red-500 hover:from-purple-500 hover:to-red-400 text-white shadow-lg shadow-purple-600/30' 
            : 'bg-gradient-to-r from-purple-700/70 to-purple-600/70 hover:from-purple-600/80 hover:to-purple-500/80 text-purple-100 hover:text-white'
        }`}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const PricingPlans: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="pricing" className="w-full py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-purple-100 mb-2">
          {t('app.pricing.title') || '价格计划'}
        </h2>
        <p className="text-center text-purple-300 mb-10">
          {t('app.pricing.subtitle') || '选择最适合您的计划，享受专业的中文名生成服务'}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingPlan
            title={t('app.pricing.monthly.title') || '月度计划'}
            price="1"
            duration={t('app.pricing.monthly.duration') || '月'}
            features={[
              t('app.pricing.features.unlimited') || '无限生成中文名',
              t('app.pricing.features.meaningExplanation') || '详细名字含义解释',
              t('app.pricing.features.basicSupport') || '基本客户支持'
            ]}
            buttonText={t('app.pricing.subscribe') || '立即订阅'}
          />
          
          <PricingPlan
            title={t('app.pricing.quarterly.title') || '季度计划'}
            price="2"
            duration={t('app.pricing.quarterly.duration') || '3个月'}
            features={[
              t('app.pricing.features.unlimited') || '无限生成中文名',
              t('app.pricing.features.meaningExplanation') || '详细名字含义解释',
              t('app.pricing.features.priority') || '优先生成请求',
              t('app.pricing.features.standardSupport') || '标准客户支持',
              t('app.pricing.features.saving') || '比月付节省约33%'
            ]}
            isPopular={true}
            buttonText={t('app.pricing.bestValue') || '最超值'}
          />
          
          <PricingPlan
            title={t('app.pricing.annual.title') || '年度计划'}
            price="7"
            duration={t('app.pricing.annual.duration') || '年'}
            features={[
              t('app.pricing.features.unlimited') || '无限生成中文名',
              t('app.pricing.features.meaningExplanation') || '详细名字含义解释',
              t('app.pricing.features.priority') || '优先生成请求',
              t('app.pricing.features.premiumSupport') || '高级客户支持',
              t('app.pricing.features.customNames') || '个性化名字定制',
              t('app.pricing.features.bigSaving') || '比月付节省约42%'
            ]}
            buttonText={t('app.pricing.subscribe') || '立即订阅'}
          />
        </div>
        
        <div className="text-center mt-12 bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 max-w-3xl mx-auto border border-purple-700/30 backdrop-blur-sm">
          <p className="text-purple-200 mb-4">
            {t('app.pricing.comingSoon') || '支付系统即将上线！目前您可以免费试用所有功能。'}
          </p>
          <p className="text-purple-300 text-sm">
            {t('app.pricing.questions') || '如有任何问题，请联系：'} 
            <a 
              href="mailto:y206186.gmail.com" 
              className="text-purple-400 hover:text-white transition-colors duration-300 underline"
            >
              y206186.gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans; 