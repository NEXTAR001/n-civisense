import React from 'react';
import { ArrowRight, Shield, Users, MessageCircle, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from './context/LanguageContext';

const Hero: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">

            <div className="relative max-w-7xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
                    {/* Left Content */}
                    <div className="space-y-12 text-center lg:text-left flex-1 max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center justify-center lg:justify-start">
                            <span className="px-8 py-1.5 bg-[#16A34AE5] text-white text-xs font-medium rounded-full">
                                {t('hero.badge')}
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-4xl font-bold leading-tight">
                                {t('hero.title1')}{' '}
                                <span className="text-green-600">{t('hero.titleHighlight1')}</span>
                                <br />
                                {t('hero.title2')}{' '}
                                <span className="text-green-600">{t('hero.titleHighlight2')}</span>
                            </h1>
                            <p className="text-xl sm:text-2xl text-black font-medium">
                                {t('hero.subtitle')}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                            <button className="w-full sm:w-auto px-8 py-4 bg-[#16A34A] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95">
                                {t('hero.cta.primary')}
                            </button>
                            <button className="w-full sm:w-auto flex items-center justify-center text-sm gap-2 px-6 py-4 text-[#16A34A] font-semibold transition-colors group">
                                {t('hero.cta.secondary')}
                                <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Illustration & Cards */}
                    <div className="relative flex-1 flex justify-center">
                        {/* Main illustration container */}
                        <div className="relative w-full max-w-lg mx-auto">
                            {/* Circular background - smaller and behind */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[75%] h-[75%] bg-gradient-to-br from-green-200 via-yellow-200 to-green-100 rounded-full blur-2xl opacity-50"></div>
                            </div>

                            {/* Character placeholder - smaller to show less background */}
                            <div className="relative z-10 w-full aspect-square max-w-[520px] mx-auto bg-[#16A34A1A] rounded-full flex items-center justify-center overflow-hidden">
                                {/* Character representation - enlarged to fill space */}
                                <div className="absolute inset-0 flex items-center justify-center scale-95">
                                    <div className="text-center w-full h-full">
                                        <Image
                                            src="/hero.png"
                                            alt="Character"
                                            width={700}
                                            height={700}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Cards */}
                            {/* Language Card */}
                            <div className="absolute top-8 right-0 lg:right-[-40px] bg-white rounded-2xl shadow-xl p-4 animate-float z-20 max-w-[200px]">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{t('hero.cards.language.title')}</p>
                                        <p className="text-xs text-gray-600">{t('hero.cards.language.subtitle')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* NIMC Card */}
                            <div className="absolute bottom-32 left-0 lg:left-[-40px] bg-white rounded-2xl shadow-xl p-4 animate-float-delayed z-20 max-w-[200px]">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{t('hero.cards.nimc.title')}</p>
                                        <p className="text-xs text-gray-600">{t('hero.cards.nimc.subtitle')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* AI Chat Card */}
                            <div className="absolute bottom-8 right-0 lg:right-[-20px] bg-white rounded-2xl shadow-xl p-4 animate-float z-20 max-w-[200px]">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MessageCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{t('hero.cards.chat.title')}</p>
                                        <p className="text-xs text-gray-600">{t('hero.cards.chat.subtitle')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                
                @keyframes float-delayed {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-15px);
                    }
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 3s ease-in-out infinite 0.5s;
                }
            `}</style>
        </section>
    );
};

export default Hero;