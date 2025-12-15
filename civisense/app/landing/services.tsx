'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from './context/LanguageContext';

interface Service {
    id: string;
    title: string;
    description: string;
}

const GovernmentServices: React.FC = () => {
    const { t } = useLanguage();
    const [expandedService, setExpandedService] = useState<string | null>('nimc');

    const services: Service[] = [
        {
            id: 'nimc',
            title: t('services.nimc.title'),
            description: t('services.nimc.description'),
        },
        {
            id: 'firs',
            title: t('services.firs.title'),
            description: t('services.firs.description'),
        },
        {
            id: 'frsc',
            title: t('services.frsc.title'),
            description: t('services.frsc.description'),
        },
    ];

    const secondServices: Service[] = [
        {
            id: 'health',
            title: t('services.health.title'),
            description: t('services.health.description'),
        },
        {
            id: 'education',
            title: t('services.education.title'),
            description: t('services.education.description'),
        },
        {
            id: 'agriculture',
            title: t('services.agriculture.title'),
            description: t('services.agriculture.description'),
        },
    ];

    const toggleService = (serviceId: string) => {
        setExpandedService(expandedService === serviceId ? null : serviceId);
    };

    return (
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 mb-4">
                        {t('services.title1')} <span className="text-green-600">{t('services.titleHighlight1')}</span> {t('services.title2')}{' '}
                        <span className="text-green-600">{t('services.titleHighlight2')}</span>
                    </h2>
                    <p className="text-lg lg:text-xl text-black font-medium max-w-4xl mx-auto leading-relaxed">
                        {t('services.subtitle')}
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left Column - Services List */}
                    <div className="space-y-6">
                        <div className="mb-8">
                            <h3 className="text-2xl lg:text-4xl font-semibold text-gray-900 mb-4">
                                {t('services.coreServices.title')}
                            </h3>
                            <p className="text-black leading-relaxed">
                                {t('services.coreServices.description')}
                            </p>
                        </div>

                        {/* Accordion Services */}
                        <div className="space-y-4">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="border-b border-b-gray-200 overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleService(service.id)}
                                        className="bg-transparent w-full flex items-center justify-between py-5 lg:py-6 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-base lg:text-lg font-semibold text-gray-900 pr-4">
                                            {service.title}
                                        </span>
                                        {expandedService === service.id ? (
                                            <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                        )}
                                    </button>

                                    {/* Expanded Content */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${expandedService === service.id
                                            ? 'max-h-40 opacity-100'
                                            : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="pb-5 lg:pb-6 pt-2 border-t border-gray-100">
                                            <p className="text-gray-600 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Visual Placeholder */}
                    <div className="relative">
                        <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] max-w-md rounded-3xl border-4 border-green-200 overflow-hidden">
                            {/* Decorative elements */}
                            <div className="aspect-square lg:h-full min-h-[400px] rounded-3xl border-4 border-green-200 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                                    alt="Government Office Services"
                                    className="w-full h-full object-cover rounded-3xl overflow-hidden"
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start pt-32">
                    {/* Right Column - Visual Placeholder */}
                    <div className="relative">
                        <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] max-w-md rounded-3xl border-4 border-green-200 overflow-hidden">
                            {/* Decorative elements */}
                            <div className="aspect-square lg:h-full min-h-[400px] rounded-3xl border-4 border-green-200 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80"
                                    alt="Public Programs and Citizen Support"
                                    className="w-full h-full object-cover rounded-3xl overflow-hidden"
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                    {/* Left Column - Services List */}
                    <div className="space-y-6">
                        <div className="mb-8">
                            <h3 className="text-2xl lg:text-4xl font-semibold text-gray-900 mb-4">
                                Sector Support & Public Programs
                            </h3>
                            <p className="text-black leading-relaxed">
                                Explore government initiatives in health, education, and agriculture designed to support citizens and communities.
                            </p>
                        </div>

                        {/* Accordion Services */}
                        <div className="space-y-4">
                            {secondServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="border-b border-b-gray-200 overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleService(service.id)}
                                        className="bg-transparent w-full flex items-center justify-between py-5 lg:py-6 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-base lg:text-lg font-semibold text-gray-900 pr-4">
                                            {service.title}
                                        </span>
                                        {expandedService === service.id ? (
                                            <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                        )}
                                    </button>

                                    {/* Expanded Content */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${expandedService === service.id
                                            ? 'max-h-40 opacity-100'
                                            : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="pb-5 lg:pb-6 pt-2 border-t border-gray-100">
                                            <p className="text-gray-600 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default GovernmentServices;