import React from 'react';
import { MessageSquare, Cpu, ShieldCheck } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

const Info: React.FC = () => {
    const { t } = useLanguage();
    
    const features = [
        {
            icon: MessageSquare,
            title: t('info.features.language.title'),
            description: t('info.features.language.description'),
            highlighted: false,
        },
        {
            icon: Cpu,
            title: t('info.features.ai.title'),
            description: t('info.features.ai.description'),
            highlighted: true,
        },
        {
            icon: ShieldCheck,
            title: t('info.features.verified.title'),
            description: t('info.features.verified.description'),
            highlighted: false,
        },
    ];

    return (
        <section className="py-16 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#16A34A0D]">
            <div className="max-w-7xl mx-auto">

                {/* Feature Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-2xl p-8 transition-all duration-300 shadow-xl hover:shadow-2xl`}
                            >
                                {/* Icon Container */}
                                <div className="mb-6">
                                    <div
                                        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                            feature.highlighted
                                                ? 'bg-green-100'
                                                : 'bg-green-50 group-hover:bg-green-100'
                                        }`}
                                    >
                                        <Icon
                                            className={`w-8 h-8 transition-all duration-300 ${
                                                feature.highlighted
                                                    ? 'text-green-600'
                                                    : 'text-green-500 group-hover:text-green-600'
                                            }`}
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                                
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Info;