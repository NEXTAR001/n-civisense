import React from 'react';
import { LayoutGrid, MessageCircle, Infinity } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

const HowItWorks: React.FC = () => {
    const { t } = useLanguage();
    
    const steps = [
        {
            number: '01',
            icon: LayoutGrid,
            title: t('howItWorks.steps.chooseService.title'),
            description: t('howItWorks.steps.chooseService.description'),
        },
        {
            number: '02',
            icon: MessageCircle,
            title: t('howItWorks.steps.askInYourLanguage.title'),
            description: t('howItWorks.steps.askInYourLanguage.description'),
            customText: t('howItWorks.steps.askInYourLanguage.customText'),
        },
        {
            number: '03',
            icon: Infinity,
            title: t('howItWorks.steps.getGuidance.title'),
            description: t('howItWorks.steps.getGuidance.description'),
        },
    ];

    return (
        <div className="bg-white">
            {/* How n-CIVISENSE Works Section */}
            <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16 lg:mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900">
                            {t('howItWorks.title').split('n-CIVISENSE')[0]}
                            <span className="text-green-600">n-CIVISENSE</span>
                            {t('howItWorks.title').split('n-CIVISENSE')[1]}
                        </h2>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className="flex flex-col items-center text-center">
                                    {/* Icon Container with Number Badge */}
                                    <div className="relative mb-8">
                                        <div className="w-40 h-40 bg-green-100 rounded-3xl flex items-center justify-center">
                                            {step.customText ? (
                                                <span className="text-2xl font-semibold text-green-600">
                                                    {step.customText}
                                                </span>
                                            ) : (
                                                <Icon className="w-16 h-16 text-green-600" />
                                            )}
                                        </div>
                                        <div className="absolute -top-3 -right-3 w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                            {step.number}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed max-w-xs">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;