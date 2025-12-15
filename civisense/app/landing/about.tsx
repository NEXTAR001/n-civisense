'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from './context/LanguageContext';

export default function AboutUs() {
    const { t } = useLanguage();
    
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-16">
                    {t('about.title')}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-start">
                    {/* Left Side - Image Placeholder */}
                    <div className="w-full">
                        <div className="rounded-3xl aspect-square w-full max-w-xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80"
                                alt={t('about.title')}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-6 my-auto">
                        {/* Description */}
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {t('about.description1')}
                        </p>

                        <p className="text-gray-700 text-lg leading-relaxed">
                            {t('about.description2')}
                        </p>

                        {/* Features List */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                    </div>
                                </div>
                                <p className="text-gray-700 text-base">
                                    <span className="font-semibold">{t('about.features.nigerianTech.title')}</span> {t('about.features.nigerianTech.description')}
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                    </div>
                                </div>
                                <p className="text-gray-700 text-base">
                                    <span className="font-semibold">{t('about.features.coverage.title')}</span> {t('about.features.coverage.description')}
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                    </div>
                                </div>
                                <p className="text-gray-700 text-base">
                                    <span className="font-semibold">{t('about.features.madeInNigeria.title')}</span> {t('about.features.madeInNigeria.description')}
                                </p>
                            </div>
                        </div>

                        {/* Developer Info Box */}
                        <div className="bg-green-100 border-l-4 border-green-500 p-6 mt-8">
                            <p className="text-gray-600 text-sm mb-1">{t('about.developer.title')}</p>
                            <p className="text-gray-900 text-xl font-semibold">
                                {t('about.developer.name')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}